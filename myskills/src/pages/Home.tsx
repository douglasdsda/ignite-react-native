import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Alert,
  FlatList,
  StatusBar,
} from "react-native";
import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState("");
  const [myskills, setMyskills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState("");

  function handleAddSkill() {
    if (newSkill) {
      const data = {
        id: String(new Date().getTime()),
        name: newSkill,
        date: new Date(),
      };
      console.log('data: ', data)
      setMyskills((oldState) => [...oldState, data]);
      setNewSkill("");
    } else Alert.alert("Campo Invalido", "O campo de new skill esta vazio.");
  }

  function handleRemoveSKill(id: string) {
    setMyskills((oldState) => oldState.filter((item) => item.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) setGretting("Good morning");
    else if (currentHour >= 12 && currentHour < 18)
      setGretting("Good afternoon");
    else setGretting("Good Night");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Douglas</Text>

      <Text style={styles.greetings}>{gretting}</Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
        value={newSkill}
      />
      <Button title="Add" activeOpacity={0.7} onPress={handleAddSkill} />

      <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>

      <FlatList
        data={myskills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SkillCard
            onPress={() => handleRemoveSKill(item.id)}
            skill={item.name}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121510",
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#1F1e25",
    color: "#FFF",
    fontSize: 18,
    padding: Platform.OS === "ios" ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  buttonSkill: {
    backgroundColor: "#1F1E25",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginVertical: 10,
  },
  textSkill: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  greetings: {
    color: "#FFF",
  },
});
