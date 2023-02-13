// This file was @generated using pocketbase-typegen

export type IsoDateString = string

export type RecordIdString = string

export type UserIdString = string

export type BaseRecord = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	"@collectionId": string
	"@collectionName": string
	"@expand"?: { [key: string]: any }
}

export enum Collections {
	Users = "users",
}

export type UsersRecord = {
	name?: string
	avatar?: string
	verified?: boolean
}

export type UsersResponse = UsersRecord & BaseRecord

export type CollectionRecords = {
	users: UsersRecord
}