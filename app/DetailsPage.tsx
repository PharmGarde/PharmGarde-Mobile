import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import images from "@/constants/image";
import { useLocalSearchParams } from "expo-router";
import Navbar from "@/components/Navbar";
import { CommentModal } from "@/components/CommentModal";
import axios from "axios";


export default function Details() {
    const params = useLocalSearchParams();
    const pharmacy = typeof params.pharmacy === "string" ? JSON.parse(params.pharmacy) : params.pharmacy;
    
    const [comments, setComments] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newComment, setNewComment] = useState("");

    // Fetch comments from API
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://172.16.8.207:3000/comments/${pharmacy._id}`);
                const data = await response.data;
                setComments(data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [pharmacy.id]);

    // Submit a new comment
    const handleAddComment = async () => {
        if (newComment.trim() === "") return;

        try {
            const response = await fetch("https://your-api.com/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pharmacyId: pharmacy.id, text: newComment }),
            });

            if (response.ok) {
                const addedComment = await response.json();
                setComments([...comments, addedComment]);
                setNewComment("");
                setModalVisible(false);
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <>
            <View className="w-full h-full bg-[#007f5f] p-4 rounded-md ">
                <View className="!bg-gray-100 mt-2 rounded-md flex flex-row gap-4 p-2">
                    <View>
                        {/* <Image source={images.pharmacyIllustration} className="w-32 h-32" resizeMode="contain" /> */}
                    </View>
                    <View className="w-7/12">
                        <Text className="font-rubik-bold text-gray-600">{pharmacy.name}</Text>
                        <Text className="ml-2">
                            <Ionicons className="text-white" name="location-outline" /> {pharmacy.address}
                        </Text>
                        <Text className="ml-2">
                            <Ionicons className="text-white" name="call-outline" /> {pharmacy.phoneNumber}
                        </Text>
                        {pharmacy.nightshift === true || pharmacy.nightshift === "true" ? (
                            <>
                                <Text className="ml-2">
                                    <Ionicons className="text-white" name="moon-outline" /> We are working tonight
                                </Text>
                                <Text className="ml-2">
                                    <Ionicons className="text-white" name="calendar-outline" />
                                    {pharmacy.openingHoursNight || "8PM - 7AM"}
                                </Text>
                            </>
                        ) : (
                            <Text className="ml-2">
                                <Ionicons className="text-white" name="moon-outline" /> No night shift
                            </Text>
                        )}

                        {pharmacy.weekendshift === true || pharmacy.weekendshift === "true" ? (
                            <Text className="ml-2">
                                <Ionicons className="text-white" name="moon-outline" /> We will be available this weekend
                            </Text>
                        ) : (
                            <Text className="ml-2">
                                <Ionicons className="text-white" name="globe-outline" /> No weekend shift
                            </Text>
                        )}

                        <View className="flex flex-row justify-between">
                            <TouchableOpacity className="bg-green-50 shadow-md shadow-zinc-300 rounded-full w-5/12 px-3 py-4 mt-5">
                                <View className="flex flex-row items-center justify-center">
                                    <Ionicons className="text-white" name="heart-circle-outline" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-green-50 shadow-md shadow-zinc-300 rounded-full w-5/12 px-3 py-4 mt-5">
                                <View className="flex flex-row items-center justify-center ">
                                    <Ionicons className="text-white" name="compass-outline" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity className="bg-white p-3 mt-4 rounded-md shadow-md" onPress={() => setModalVisible(true)}>
                    <Text className="text-center font-bold text-gray-700">Add a Comment</Text>
                </TouchableOpacity>

                <View className="mt-4">
                    <Text className="font-bold text-lg text-white mb-2">Comments:</Text>
                    {comments.length > 0 ? (
                        <FlatList
                            data={comments}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View className="bg-white p-4 rounded-md mb-4 shadow-md">
                                    <Text className="text-gray-800">{item.body}</Text>
                                </View>
                            )}
                        />
                    ) : (
                        <Text className="text-white">No comments yet.</Text>
                    )}
                </View>
            </View>

            {/* Integrate the CommentModal component */}
            <CommentModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                newComment={newComment}
                setNewComment={setNewComment}
                handleAddComment={handleAddComment}
            />
        </>
    );
}
