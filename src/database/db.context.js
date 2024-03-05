import React, {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import SQLite from 'react-native-sqlite-2';

import {rowsToJson} from '../utils';

import db from '../db';
const dbName = 'quotes.db';
const sqliteDB = SQLite.openDatabase({name: dbName, location: 'default'});

const QuoteContext = createContext();

const QuoteProvider = ({children}) => {
  const [selected, setSelected] = useState(0);
  const [players, setPlayers] = useState([{}, {}]);
  const [countIsRead, setCountIsRead] = useState(0);
  const [oldQuoteItem, setOldQuoteItem] = useState(null);

  const selectQuotes = ({category = '*', gender = "*", isRead = '*'}, cb) => {
    sqliteDB.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM quotes WHERE category = ?, gender = ?, isRead = ?',
        [category, gender, isRead],
        (_, {rows}) => {
          cb(rowsToJson(rows));
        },
      );
    });
  };

  const selectOneRandomly = ({category = -1}, cb) => {
    if (category < 0) cb({total: 0, isRead: -1, selItem: {}});
    else {
      sqliteDB.transaction(tx => {
        tx.executeSql(
          'SELECT COUNT(*) AS count FROM quotes WHERE category = ?',
          [category],
          (_, {rows}) => {
            const _total = rows.item(0).count;
            sqliteDB.transaction(tx => {
              tx.executeSql(
                'SELECT COUNT(*) AS count FROM quotes WHERE isRead = 1 AND category = ?',
                [category],
                (_, {rows}) => {
                  const _isRead = rows.item(0).count;

                  sqliteDB.transaction(tx => {
                    tx.executeSql(
                      'SELECT * FROM quotes WHERE isRead = 0 AND category = ? AND gender = ? ORDER BY RANDOM() LIMIT 1;',
                      [category, selected],
                      (_, {rows}) => {
                        const _selItem = rows.item(0);
                        cb({
                          total: _total,
                          isRead: _isRead,
                          selItem: _selItem,
                        });
                      },
                      handleTableError,
                    );
                  });
                },
                handleTableError,
              );
            });
          },
          handleTableError,
        );
      });
    }
  };

  const addQuote = ({category, gender, content}, cb) => {
    sqliteDB.transaction(tx => {
      tx.executeSql(
        'INSERT INTO quotes (category, gender, content, isRead) VALUES (?, ?, ?, 0)',
        [category, gender, content],
        () => {
          cb();
        },
        () => {
          Alert.alert('Fehler', 'Errors occured while add new quote');
        },
      );
    });
  };

  const setReadQuote = ({quoteItem}, cb) => {
    sqliteDB.transaction(tx => {
      tx.executeSql(
        'UPDATE quotes SET isRead = 1 WHERE id = ?',
        [quoteItem?.id],
        () => {
          setOldQuoteItem(quoteItem);
          setCountIsRead(prev => prev + 1);

          cb();
        },
      );
    });
  };

  const deleteQuote = ({id}, cb) => {
    sqliteDB.transaction(tx => {
      tx.executeSql('DELETE FROM quotes WHERE id = ?', [id], () => {
        cb();
      });
    });
  };

  const resetAllUnreadByCategory = ({category = -1}, cb) => {
    if (category < 0) return cb();

    sqliteDB.transaction(tx => {
      tx.executeSql(
        'UPDATE quotes SET isRead = 0 WHERE category = ?',
        [category],
        (_, {rowsAffected}) => {
          setCountIsRead(prev => prev - rowsAffected);
          cb();
        },
        handleTableError,
      );
    });
  };

  const updateUserName = (_players, cb) => {
    sqliteDB.transaction(tx => {
      tx.executeSql(
        'UPDATE users SET name = CASE WHEN id = ? THEN ? WHEN id = ? THEN ? END WHERE id IN (?, ?);',
        [
          _players[0].id,
          _players[0].name,
          _players[1].id,
          _players[1].name,
          _players[0].id,
          _players[1].id,
        ],
        () => {
          // console.log({_players});
          setPlayers(_players);
          cb();
        },
        () => {
          Alert.alert('Fehler', 'Errors occured while player name updating');
        },
      );
    });
  };

  function handleTableError(error) {
    Alert.alert(
      'Fehler',
      'Cannot read database',
      [{text: 'Stornieren', onPress: () => console.error({error})}],
      {cancelable: false},
    );
  }

  const deleteTable = ({tableName = 'quotes'}) => {
    sqliteDB.transaction(tx => {
      tx.executeSql(
        `DROP TABLE IF EXISTS ${tableName};`,
        [],
        () => {
          Alert.alert(`Tabelle '${tableName}' wurde erfolgreich gelöscht.`);
        },
        () => {
          Alert.alert(
            'Fehler',
            `Fehler beim Löschen der Tabelle'${tableName}'`,
          );
        },
      );
    });
  };

  const initializeQuotes = () => {
    sqliteDB.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY AUTOINCREMENT, category INTEGER, gender INTEGER, content TEXT, isRead BOOLEAN);',
        [],
        () => {
          sqliteDB.transaction(tx => {
            tx.executeSql(
              'SELECT COUNT(*) AS count FROM quotes',
              [],
              (_, {rows}) => {
                if (rows.item(0).count < 1) {
                  sqliteDB.transaction(tx => {
                    db.forEach(newQuote => {
                      tx.executeSql(
                        'INSERT INTO quotes (category, gender, content, isRead) VALUES (?, ?, ?, 0);',
                        [newQuote.category, newQuote.gender, newQuote.content],
                        () => {
                          setCountIsRead(0);
                        },
                        handleTableError,
                      );
                    });
                  });
                } else {
                  sqliteDB.transaction(tx => {
                    tx.executeSql(
                      'SELECT COUNT(*) AS count FROM quotes WHERE isRead = 1',
                      [],
                      (_, {rows: quotes}) => {
                        setCountIsRead(quotes.item(0).count);
                      },
                      handleTableError,
                    );
                  });
                }
              },
              handleTableError,
            );
          });
        },
        handleTableError,
      );
    });
  };

  const initializePlayers = () => {
    sqliteDB.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);',
        [],
        () => {
          sqliteDB.transaction(tx => {
            tx.executeSql(
              'SELECT COUNT(*) AS count FROM users',
              [],
              (_, {rows}) => {
                if (rows.item(0).count < 1) {
                  sqliteDB.transaction(tx => {
                    tx.executeSql(
                      'INSERT INTO users (name) VALUES (?), (?);',
                      ['Spieler 1', 'Spieler 2'],
                      () => {
                        setPlayers([
                          {id: 1, name: 'Spieler 1'},
                          {id: 2, name: 'Spieler 2'},
                        ]);
                      },
                      handleTableError,
                    );
                  });
                } else {
                  sqliteDB.transaction(tx => {
                    tx.executeSql(
                      'SELECT * FROM users',
                      [],
                      (_, {rows}) => {
                        setPlayers(rowsToJson(rows));
                      },
                      handleTableError,
                    );
                  });
                }
              },
              handleTableError,
            );
          });
        },
        handleTableError,
      );
    });
  };

  useEffect(() => {
    initializeQuotes();
    initializePlayers();
  }, []);

  return (
    <QuoteContext.Provider
      value={{
        selectQuotes,
        selectOneRandomly,
        addQuote,
        setReadQuote,
        deleteQuote,
        resetAllUnreadByCategory,
        updateUserName,
        players,
        selected,
        setSelected,
        oldQuoteItem,
        countIsRead,
      }}>
      {children}
    </QuoteContext.Provider>
  );
};

export {QuoteContext, QuoteProvider};
