/**
 * utils/dsaSnippets.js
 * Collection of DSA code snippets for Code Mode (C++).
 */

export const dsaSnippets = [
    {
        title: "Complete Binary Search Tree Implementation",
        language: "cpp",
        code: `// Binary Search Tree Node Structure
struct Node {
    int data;
    Node* left;
    Node* right;
    
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

class BinarySearchTree {
private:
    Node* root;
    
    // Helper function to insert a node recursively
    Node* insertHelper(Node* node, int value) {
        if (node == nullptr) {
            return new Node(value);
        }
        
        if (value < node->data) {
            node->left = insertHelper(node->left, value);
        } else if (value > node->data) {
            node->right = insertHelper(node->right, value);
        }
        
        return node;
    }
    
    // Helper function to find minimum value node
    Node* findMin(Node* node) {
        while (node && node->left != nullptr) {
            node = node->left;
        }
        return node;
    }
    
    // Helper function to delete a node recursively
    Node* deleteHelper(Node* node, int value) {
        if (node == nullptr) return node;
        
        if (value < node->data) {
            node->left = deleteHelper(node->left, value);
        } else if (value > node->data) {
            node->right = deleteHelper(node->right, value);
        } else {
            // Node with only one child or no child
            if (node->left == nullptr) {
                Node* temp = node->right;
                delete node;
                return temp;
            } else if (node->right == nullptr) {
                Node* temp = node->left;
                delete node;
                return temp;
            }
            
            // Node with two children
            Node* temp = findMin(node->right);
            node->data = temp->data;
            node->right = deleteHelper(node->right, temp->data);
        }
        return node;
    }
    
    // Helper function for inorder traversal
    void inorderHelper(Node* node, vector<int>& result) {
        if (node == nullptr) return;
        inorderHelper(node->left, result);
        result.push_back(node->data);
        inorderHelper(node->right, result);
    }
    
public:
    BinarySearchTree() : root(nullptr) {}
    
    void insert(int value) {
        root = insertHelper(root, value);
    }
    
    void remove(int value) {
        root = deleteHelper(root, value);
    }
    
    bool search(int value) {
        Node* current = root;
        while (current != nullptr) {
            if (value == current->data) return true;
            else if (value < current->data) current = current->left;
            else current = current->right;
        }
        return false;
    }
    
    vector<int> inorderTraversal() {
        vector<int> result;
        inorderHelper(root, result);
        return result;
    }
};`
    },
    {
        title: "Advanced Graph Algorithms with Dijkstra",
        language: "cpp",
        code: `#include <vector>
#include <queue>
#include <limits>
using namespace std;

class Graph {
private:
    int vertices;
    vector<vector<pair<int, int>>> adjacencyList;
    
public:
    Graph(int v) : vertices(v) {
        adjacencyList.resize(v);
    }
    
    void addEdge(int u, int v, int weight) {
        adjacencyList[u].push_back({v, weight});
        adjacencyList[v].push_back({u, weight});
    }
    
    vector<int> dijkstra(int source) {
        vector<int> distance(vertices, numeric_limits<int>::max());
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        
        distance[source] = 0;
        pq.push({0, source});
        
        while (!pq.empty()) {
            int currentDist = pq.top().first;
            int currentVertex = pq.top().second;
            pq.pop();
            
            if (currentDist > distance[currentVertex]) continue;
            
            for (auto& edge : adjacencyList[currentVertex]) {
                int neighbor = edge.first;
                int weight = edge.second;
                int newDist = distance[currentVertex] + weight;
                
                if (newDist < distance[neighbor]) {
                    distance[neighbor] = newDist;
                    pq.push({newDist, neighbor});
                }
            }
        }
        
        return distance;
    }
    
    void depthFirstSearch(int start, vector<bool>& visited) {
        visited[start] = true;
        cout << start << " ";
        
        for (auto& edge : adjacencyList[start]) {
            int neighbor = edge.first;
            if (!visited[neighbor]) {
                depthFirstSearch(neighbor, visited);
            }
        }
    }
    
    void breadthFirstSearch(int start) {
        vector<bool> visited(vertices, false);
        queue<int> q;
        
        visited[start] = true;
        q.push(start);
        
        while (!q.empty()) {
            int current = q.front();
            q.pop();
            cout << current << " ";
            
            for (auto& edge : adjacencyList[current]) {
                int neighbor = edge.first;
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
    }
};`
    },
    {
        title: "Dynamic Programming - Longest Common Subsequence",
        language: "cpp",
        code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class DynamicProgramming {
public:
    // Longest Common Subsequence with memoization
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.length();
        int n = text2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        return dp[m][n];
    }
    
    // 0/1 Knapsack Problem
    int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
        int n = weights.size();
        vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
        
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= capacity; w++) {
                if (weights[i - 1] <= w) {
                    dp[i][w] = max(
                        values[i - 1] + dp[i - 1][w - weights[i - 1]],
                        dp[i - 1][w]
                    );
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        
        return dp[n][capacity];
    }
    
    // Coin Change Problem - Minimum coins needed
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        
        return dp[amount] > amount ? -1 : dp[amount];
    }
    
    // Edit Distance (Levenshtein Distance)
    int editDistance(string word1, string word2) {
        int m = word1.length();
        int n = word2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1));
        
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + min({
                        dp[i - 1][j],     // delete
                        dp[i][j - 1],     // insert
                        dp[i - 1][j - 1]  // replace
                    });
                }
            }
        }
        
        return dp[m][n];
    }
};`
    },
    {
        title: "Advanced Sorting Algorithms Implementation",
        language: "cpp",
        code: `#include <vector>
#include <algorithm>
using namespace std;

class SortingAlgorithms {
public:
    // Merge Sort with detailed implementation
    void mergeSort(vector<int>& arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }
    
private:
    void merge(vector<int>& arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        
        vector<int> leftArr(n1);
        vector<int> rightArr(n2);
        
        for (int i = 0; i < n1; i++)
            leftArr[i] = arr[left + i];
        for (int j = 0; j < n2; j++)
            rightArr[j] = arr[mid + 1 + j];
        
        int i = 0, j = 0, k = left;
        
        while (i < n1 && j < n2) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k++] = leftArr[i++];
            } else {
                arr[k++] = rightArr[j++];
            }
        }
        
        while (i < n1) arr[k++] = leftArr[i++];
        while (j < n2) arr[k++] = rightArr[j++];
    }
    
public:
    // Quick Sort with random pivot
    void quickSort(vector<int>& arr, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }
    
private:
    int partition(vector<int>& arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr[i], arr[j]);
            }
        }
        swap(arr[i + 1], arr[high]);
        return i + 1;
    }
    
public:
    // Heap Sort implementation
    void heapSort(vector<int>& arr) {
        int n = arr.size();
        
        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);
        
        for (int i = n - 1; i > 0; i--) {
            swap(arr[0], arr[i]);
            heapify(arr, i, 0);
        }
    }
    
private:
    void heapify(vector<int>& arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest])
            largest = left;
        
        if (right < n && arr[right] > arr[largest])
            largest = right;
        
        if (largest != i) {
            swap(arr[i], arr[largest]);
            heapify(arr, n, largest);
        }
    }
};`
    },
    {
        title: "Trie Data Structure for String Operations",
        language: "cpp",
        code: `#include <unordered_map>
#include <string>
using namespace std;

class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    bool isEndOfWord;
    int wordCount;
    
    TrieNode() : isEndOfWord(false), wordCount(0) {}
};

class Trie {
private:
    TrieNode* root;
    
    void deleteHelper(TrieNode* node) {
        for (auto& pair : node->children) {
            deleteHelper(pair.second);
        }
        delete node;
    }
    
    void collectWords(TrieNode* node, string prefix, vector<string>& results) {
        if (node->isEndOfWord) {
            results.push_back(prefix);
        }
        
        for (auto& pair : node->children) {
            collectWords(pair.second, prefix + pair.first, results);
        }
    }
    
public:
    Trie() {
        root = new TrieNode();
    }
    
    ~Trie() {
        deleteHelper(root);
    }
    
    void insert(string word) {
        TrieNode* current = root;
        
        for (char ch : word) {
            if (current->children.find(ch) == current->children.end()) {
                current->children[ch] = new TrieNode();
            }
            current = current->children[ch];
        }
        
        current->isEndOfWord = true;
        current->wordCount++;
    }
    
    bool search(string word) {
        TrieNode* current = root;
        
        for (char ch : word) {
            if (current->children.find(ch) == current->children.end()) {
                return false;
            }
            current = current->children[ch];
        }
        
        return current->isEndOfWord;
    }
    
    bool startsWith(string prefix) {
        TrieNode* current = root;
        
        for (char ch : prefix) {
            if (current->children.find(ch) == current->children.end()) {
                return false;
            }
            current = current->children[ch];
        }
        
        return true;
    }
    
    vector<string> autoComplete(string prefix) {
        vector<string> results;
        TrieNode* current = root;
        
        for (char ch : prefix) {
            if (current->children.find(ch) == current->children.end()) {
                return results;
            }
            current = current->children[ch];
        }
        
        collectWords(current, prefix, results);
        return results;
    }
    
    bool remove(string word) {
        return removeHelper(root, word, 0);
    }
    
private:
    bool removeHelper(TrieNode* node, string& word, int depth) {
        if (depth == word.length()) {
            if (!node->isEndOfWord) return false;
            node->isEndOfWord = false;
            return node->children.empty();
        }
        
        char ch = word[depth];
        if (node->children.find(ch) == node->children.end()) {
            return false;
        }
        
        TrieNode* childNode = node->children[ch];
        bool shouldDeleteChild = removeHelper(childNode, word, depth + 1);
        
        if (shouldDeleteChild) {
            delete childNode;
            node->children.erase(ch);
            return node->children.empty() && !node->isEndOfWord;
        }
        
        return false;
    }
};`
    }
];

export const getRandomSnippet = () => {
    const randomIndex = Math.floor(Math.random() * dsaSnippets.length);
    return dsaSnippets[randomIndex];
};
