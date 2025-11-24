/**
 * utils/dsaSnippets.js
 * Collection of DSA code snippets for Code Mode (C++).
 */

export const dsaSnippets = [
    {
        title: "Binary Search",
        language: "cpp",
        code: `int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x)
            return m;
        if (arr[m] < x)
            l = m + 1;
        else
            r = m - 1;
    }
    return -1;
}`
    },
    {
        title: "Merge Sort",
        language: "cpp",
        code: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];

    for (int i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}`
    },
    {
        title: "Quick Sort",
        language: "cpp",
        code: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);

    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
    },
    {
        title: "Depth First Search (DFS)",
        language: "cpp",
        code: `void DFS(int v, vector<bool> &visited, vector<int> adj[]) {
    visited[v] = true;
    cout << v << " ";

    for (int i : adj[v]) {
        if (!visited[i])
            DFS(i, visited, adj);
    }
}`
    },
    {
        title: "Breadth First Search (BFS)",
        language: "cpp",
        code: `void BFS(int start, int V, vector<int> adj[]) {
    vector<bool> visited(V, false);
    queue<int> q;

    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int v = q.front();
        cout << v << " ";
        q.pop();

        for (int i : adj[v]) {
            if (!visited[i]) {
                visited[i] = true;
                q.push(i);
            }
        }
    }
}`
    },
    {
        title: "Reverse Linked List",
        language: "cpp",
        code: `Node* reverse(Node* head) {
    Node* current = head;
    Node *prev = NULL, *next = NULL;

    while (current != NULL) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    head = prev;
    return head;
}`
    },
    {
        title: "Stack Implementation",
        language: "cpp",
        code: `class Stack {
    int top;
public:
    int a[MAX]; 
    Stack() { top = -1; }
    bool push(int x) {
        if (top >= (MAX - 1)) return false;
        else {
            a[++top] = x;
            return true;
        }
    }
    int pop() {
        if (top < 0) return 0;
        else {
            int x = a[top--];
            return x;
        }
    }
    int peek() {
        if (top < 0) return 0;
        else return a[top];
    }
    bool isEmpty() {
        return (top < 0);
    }
};`
    },
    {
        title: "Queue Implementation",
        language: "cpp",
        code: `class Queue {
public:
    int front, rear, size;
    unsigned capacity;
    int* array;
};

Queue* createQueue(unsigned capacity) {
    Queue* queue = new Queue();
    queue->capacity = capacity;
    queue->front = queue->size = 0;
    queue->rear = capacity - 1;
    queue->array = new int[queue->capacity];
    return queue;
}

void enqueue(Queue* queue, int item) {
    if (isFull(queue)) return;
    queue->rear = (queue->rear + 1) % queue->capacity;
    queue->array[queue->rear] = item;
    queue->size = queue->size + 1;
}`
    },
    {
        title: "BST Insert",
        language: "cpp",
        code: `Node* insert(Node* node, int key) {
    if (node == NULL) return newNode(key);

    if (key < node->key)
        node->left = insert(node->left, key);
    else if (key > node->key)
        node->right = insert(node->right, key);

    return node;
}`
    }
];

export const getRandomSnippet = () => {
    const randomIndex = Math.floor(Math.random() * dsaSnippets.length);
    return dsaSnippets[randomIndex];
};
