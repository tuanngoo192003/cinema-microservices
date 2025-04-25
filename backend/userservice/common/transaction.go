package common

import (
	"database/sql"
	"user-service/infra/config"
	"user-service/infra/database"
)

func Transaction[T any](db *database.Database, fn func(tx *sql.Tx) (T, error)) (result T, err error) {
	log := config.GetLogger()

	tx, err := db.DB.Begin()
	if err != nil {
		return result, err
	}

	defer func() {
		if r := recover(); r != nil {
			_ = tx.Rollback()
			log.Error("Transaction panicked")
		}
	}()

	result, err = fn(tx)
	if err != nil {
		_ = tx.Rollback()
		log.Error("Transaction failed: " + err.Error())
		return result, err
	}

	if err := tx.Commit(); err != nil {
		log.Error("Failed to commit transaction: " + err.Error())
		return result, err
	}

	return result, nil
}
