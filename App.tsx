import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const savedTodos = await AsyncStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const saveTodos = async (newTodos: Todo[]) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
      setTodos(newTodos);
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  const addTodo = () => {
    if (!inputValue.trim()) {
      Alert.alert('Error', 'Please enter a task');
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: inputValue,
      completed: false,
      createdAt: new Date().toLocaleDateString(),
    };

    const newTodos = [newTodo, ...todos];
    saveTodos(newTodos);
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(newTodos);
  };

  const deleteTodo = (id: string) => {
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: () => {
          const newTodos = todos.filter((todo) => todo.id !== id);
          saveTodos(newTodos);
        },
      },
    ]);
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const completedCount = todos.filter((t) => t.completed).length;

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleTodo(item.id)}
      >
        <MaterialIcons
          name={item.completed ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={item.completed ? '#4CAF50' : '#999'}
        />
      </TouchableOpacity>
      <View style={styles.todoContent}>
        <Text
          style={[
            styles.todoTitle,
            item.completed && styles.completedText,
          ]}
        >
          {item.title}
        </Text>
        <Text style={styles.todoDate}>{item.createdAt}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <MaterialIcons name="delete" size={20} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>✅ My Tasks</Text>
        <Text style={styles.stats}>
          {completedCount}/{todos.length} completed
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#bbb"
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {(['all', 'active', 'completed'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterButton,
              filter === f && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && styles.filterTextActive,
              ]}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredTodos.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>📝 No tasks here!</Text>
          <Text style={styles.emptySubtext}>
            {filter === 'completed'
              ? 'Complete some tasks to see them here'
              : 'Add a task to get started'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          renderItem={renderTodoItem}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    paddingBottom: 15,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stats: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  filterButtonActive: {
    backgroundColor: '#2196F3',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContent: {
    padding: 16,
    paddingBottom: 20,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkbox: {
    marginRight: 12,
  },
  todoContent: {
    flex: 1,
  },
  todoTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  completedText: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  todoDate: {
    color: '#999',
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 24,
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
});
