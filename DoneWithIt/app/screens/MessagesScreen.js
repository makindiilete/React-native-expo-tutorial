import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { AppListItem } from "../Components/AppListItem";
import { AppScreen } from "../Components/AppScreen";
import { AppListItemSeparator } from "../Components/AppListItemSeparator";
import { AppListItemDeleteAction } from "../Components/AppListItemDeleteAction";

const initialMessages = [
  {
    id: 1,
    title: "Michaelz Omoakin",
    description: "Hey! Is this item still available?",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "Michaelz Omoakin",
    description:
      "I'm interested in this item, when will you be able to post it?",
    image: require("../assets/mosh.jpg"),
  },
];
export function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    const newMsg = messages.filter((m) => m.id !== message.id);
    setMessages(newMsg);
  };
  return (
    <AppScreen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <AppListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <AppListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={AppListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../assets/mosh.jpg"),
            },
          ]);
        }}
      />
    </AppScreen>
  );
}
