import { setDoc, doc, getDocs, query, collection, where, updateDoc, addDoc} from "firebase/firestore"
import { auth, db } from "../utils/firebase/firebase.utils"

//maybe just put all firebase database interactions into one file
export const getUserChats = async (uid) => {
	const groupsRef = collection(db, 'groups');
	const q = query(groupsRef, where("members", "array-contains", uid));

	return q;
}

export const getMessages = async (chatId) => {
	const chatsRef = collection(db, "groups", chatId, 'messages');
	const querySnapshot = await getDocs(chatsRef);
	
	const messagesArray = querySnapshot.docs.reduce((acc, docSnapshot, index) => {
		acc[index] = docSnapshot.data();
		return acc;
	}, []);

	return messagesArray;
}

//fix so that can't create chat with users that already exist
export const createChat = async (data) => {
	const groupRef = doc(collection(db, "groups"));
	await setDoc(groupRef, {
		...data,
		id: groupRef.id,
	});
}

export const updateChat = async (groupId, data) => {
	const groupDocRef = doc(db, 'groups', groupId);
	await updateDoc(groupDocRef, {
		...data
	});
}

export const sendMessage = async (groupId, data) => {
	//probably could optimize
	const docRef = doc(collection(db, "groups", groupId, "messages"));
	await setDoc(docRef, {
		...data,
		id: docRef.id
	});

	const {sentAt} = data;
	updateChat(groupId, {modifiedAt: sentAt, recentMessage: data});
}


