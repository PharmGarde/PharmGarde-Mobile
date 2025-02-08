import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

export function CommentModal({ 
    modalVisible, 
    setModalVisible, 
    newComment, 
    setNewComment, 
    handleAddComment 
}){
    return (
        <Modal 
            animationType="slide" 
            transparent={true} 
            visible={modalVisible} 
            onRequestClose={() => setModalVisible(false)}
        >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <View className="bg-white p-4 rounded-md w-3/4">
                    <Text className="font-bold text-lg text-gray-700 mb-2">Add a Comment</Text>
                    <TextInput
                        className="border p-2 rounded-md w-full h-32"
                        placeholder="Type your comment..."
                        value={newComment}
                        onChangeText={setNewComment}
                        multiline
                        textAlignVertical="top"
                    />
                    <View className="flex flex-row justify-between mt-4">
                        <TouchableOpacity
                            className="bg-gray-300 px-4 py-2 rounded-md" 
                            onPress={() => setModalVisible(false)}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            className="bg-green-500 px-4 py-2 rounded-md" 
                            onPress={handleAddComment}
                        >
                            <Text className="text-white">Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
