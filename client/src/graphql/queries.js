import {gql} from "@apollo/react-hooks";

export const GET_USERS = gql`
	query GetUsers {
		getUsers{
			id
			fistname
			name
			email
		}
	}
`

export const GET_CHATS = gql`
	query GetChats {
		getChats{
			id
			sender
			message
			timestamp
		}
	}
`

export const CREATE_USER = gql`
	query CreateUser($firstname: String, $name: String, $email: String) {
		createUser(firstname: $firstname, name: $name, email: $email) {
			firstname
			name
			email
		}
	}
`

export const CREATE_CHAT = gql`
	query CreateChat($sender: ID, $message: String) {
		createChat(sender: $sender, message: $message) {
			sender
			message
		}
	}
`