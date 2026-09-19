import { DiagnosticQuestion } from "@/types/learning";

export const dsaDiagnosticQuestions: DiagnosticQuestion[] = [
  // 1. Big O & Array Access
  {
    id: "q-dsa-001",
    domain: "dsa",
    topicSlug: "big-o-notation",
    category: "Foundations",
    difficulty: "beginner",
    type: "concept",
    question: "What is the worst-case time complexity of accessing an element at a known index in an array?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 0,
    explanation: "Because arrays are stored in contiguous memory blocks, any index can be computed directly via base address + (index * element size) in O(1) constant time.",
  },

  // 2. Loop Complexity
  {
    id: "q-dsa-002",
    domain: "dsa",
    topicSlug: "complexity-analysis",
    category: "Foundations",
    difficulty: "intermediate",
    type: "code",
    question: "What is the time complexity of the following code snippet?",
    codeSnippet: `function solve(n: number) {
  let count = 0;
  for (let i = 1; i < n; i *= 2) {
    for (let j = 0; j < n; j++) {
      count++;
    }
  }
  return count;
}`,
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctAnswer: 1,
    explanation: "The outer loop doubles `i` on each step, running in O(log n) iterations. The inner loop executes `n` times for every outer step, resulting in O(n log n) total time.",
  },

  // 3. Dynamic Array Amortization
  {
    id: "q-dsa-003",
    domain: "dsa",
    topicSlug: "dynamic-arrays",
    category: "Arrays & Strings",
    difficulty: "intermediate",
    type: "concept",
    question: "Appending an element to the end of a standard dynamic array (e.g. JavaScript array or C++ vector) has what amortized time complexity?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
    correctAnswer: 1,
    explanation: "While resizing occasionally takes O(n) to copy elements into a doubled capacity buffer, the geometric resizing sequence averages out to O(1) amortized time per append.",
  },

  // 4. Recursion Call Stack
  {
    id: "q-dsa-004",
    domain: "dsa",
    topicSlug: "recursion",
    category: "Foundations",
    difficulty: "beginner",
    type: "concept",
    question: "What happens when a recursive function lacks a valid base case or fails to reach it?",
    options: [
      "Returns undefined immediately",
      "Causes a Stack Overflow exception (Maximum Call Stack Exceeded)",
      "Executes in O(1) time",
      "Automatically optimizes into a loop",
    ],
    correctAnswer: 1,
    explanation: "Every recursive call allocates a stack frame on the call stack. Without a terminating base case, frames accumulate indefinitely until system memory limit triggers a stack overflow.",
  },

  // 5. Two Pointers Technique
  {
    id: "q-dsa-005",
    domain: "dsa",
    topicSlug: "two-pointers",
    category: "Arrays & Strings",
    difficulty: "intermediate",
    type: "problem_strategy",
    question: "Which approach is most optimal for finding two numbers in a sorted array that sum to a target value in O(n) time and O(1) extra space?",
    options: [
      "Two pointers starting at opposite ends (left = 0, right = n-1)",
      "Nested double loop checking every pair",
      "Binary search on every possible pair",
      "Hash set storing visited values",
    ],
    correctAnswer: 0,
    explanation: "Since the array is sorted, converging left and right pointers based on whether the current sum is less than or greater than the target solves the problem in O(n) time and O(1) space.",
  },

  // 6. Sliding Window
  {
    id: "q-dsa-006",
    domain: "dsa",
    topicSlug: "sliding-window",
    category: "Arrays & Strings",
    difficulty: "intermediate",
    type: "problem_strategy",
    question: "When is the Sliding Window pattern most applicable?",
    options: [
      "When finding disconnected subsets of non-adjacent numbers",
      "When searching for contiguous subarrays or substrings satisfying a given condition",
      "When sorting a graph topologically",
      "When finding all permutations of an array",
    ],
    correctAnswer: 1,
    explanation: "Sliding window works specifically on contiguous subsegments, adjusting window bounds in O(n) time instead of recalculating from scratch.",
  },

  // 7. Prefix Sum
  {
    id: "q-dsa-007",
    domain: "dsa",
    topicSlug: "prefix-sum",
    category: "Arrays & Strings",
    difficulty: "intermediate",
    type: "concept",
    question: "Given a prefix sum array `prefix` where `prefix[i] = nums[0] + ... + nums[i]`, what formula computes the sum of the subarray from index `L` to `R` (L > 0) in O(1) time?",
    options: [
      "prefix[R] - prefix[L - 1]",
      "prefix[R] - prefix[L]",
      "prefix[R + 1] - prefix[L]",
      "prefix[R] + prefix[L]",
    ],
    correctAnswer: 0,
    explanation: "Sum(nums[L..R]) = Sum(nums[0..R]) - Sum(nums[0..L-1]) = prefix[R] - prefix[L - 1].",
  },

  // 8. Singly Linked Lists
  {
    id: "q-dsa-008",
    domain: "dsa",
    topicSlug: "singly-linked-lists",
    category: "Linked Lists",
    difficulty: "beginner",
    type: "concept",
    question: "What is the primary architectural advantage of a singly linked list over a contiguous static array?",
    options: [
      "Faster O(1) random index access",
      "O(1) insertion and deletion at a given node reference without element shifting",
      "Better CPU cache locality",
      "Reduced memory overhead per element",
    ],
    correctAnswer: 1,
    explanation: "Linked lists can insert or remove nodes in O(1) time by re-pointing references, without shifting subsequent elements in memory.",
  },

  // 9. Fast & Slow Pointers (Floyd's Cycle)
  {
    id: "q-dsa-009",
    domain: "dsa",
    topicSlug: "fast-and-slow-pointers",
    category: "Linked Lists",
    difficulty: "intermediate",
    type: "concept",
    question: "In Floyd's Cycle Detection Algorithm (Tortoise and Hare), if a cycle exists in a linked list:",
    options: [
      "The fast pointer reaches null first",
      "The fast and slow pointers will eventually point to the exact same node inside the cycle",
      "The slow pointer will reverse direction",
      "The algorithm enters an infinite loop without detection",
    ],
    correctAnswer: 1,
    explanation: "Since the fast pointer advances 2 steps while the slow pointer advances 1 step, the distance between them inside the cycle decreases by 1 on every step until they meet.",
  },

  // 10. Stacks & LIFO
  {
    id: "q-dsa-010",
    domain: "dsa",
    topicSlug: "stack",
    category: "Stacks & Queues",
    difficulty: "beginner",
    type: "problem_strategy",
    question: "Which data structure is ideal for validating matching balanced parentheses like '{[()]}'?",
    options: ["Queue", "Stack", "Priority Queue", "Disjoint Set Union"],
    correctAnswer: 1,
    explanation: "Pushing opening brackets onto a stack and popping to verify matches against closing brackets ensures the most recently opened bracket is closed first (LIFO).",
  },

  // 11. Queues & BFS
  {
    id: "q-dsa-011",
    domain: "dsa",
    topicSlug: "queue",
    category: "Stacks & Queues",
    difficulty: "beginner",
    type: "concept",
    question: "Which graph traversal algorithm relies fundamentally on a FIFO Queue?",
    options: [
      "Depth-First Search (DFS)",
      "Breadth-First Search (BFS)",
      "Binary Search",
      "Dijkstra's Algorithm with Fibonacci Heap",
    ],
    correctAnswer: 1,
    explanation: "BFS uses a FIFO queue to visit nodes level by level in order of their discovery distance from the start node.",
  },

  // 12. Hash Table Complexity
  {
    id: "q-dsa-012",
    domain: "dsa",
    topicSlug: "hash-tables",
    category: "Hashing",
    difficulty: "beginner",
    type: "concept",
    question: "What is the average time complexity of searching, inserting, and deleting a key in a well-distributed hash table?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 0,
    explanation: "Under uniform hashing with a low load factor, hash table operations execute in O(1) average time.",
  },

  // 13. Frequency Counting & Anagrams
  {
    id: "q-dsa-013",
    domain: "dsa",
    topicSlug: "frequency-counting",
    category: "Hashing",
    difficulty: "intermediate",
    type: "problem_strategy",
    question: "How can you determine if two lowercase strings `s` and `t` of length n are anagrams in O(n) time and O(1) auxiliary space?",
    options: [
      "Sort both strings in O(n log n) and compare",
      "Use a fixed 26-element integer frequency array to count character occurrences",
      "Check all n! permutations of s",
      "Use nested loops to find every character",
    ],
    correctAnswer: 1,
    explanation: "A fixed 26-element array uses O(1) auxiliary space (constant size 26) and counts character frequencies in a single O(n) pass.",
  },

  // 14. Binary Search Prerequisites
  {
    id: "q-dsa-014",
    domain: "dsa",
    topicSlug: "binary-search",
    category: "Searching",
    difficulty: "beginner",
    type: "concept",
    question: "What is the prerequisite condition for applying standard binary search directly on an array?",
    options: [
      "The array must contain only positive integers",
      "The array elements must be sorted",
      "The array length must be a power of 2",
      "The array must not contain duplicate values",
    ],
    correctAnswer: 1,
    explanation: "Binary search depends on the monotonic ordering of sorted elements to discard half the search space on each step.",
  },

  // 15. Merge Sort Complexity
  {
    id: "q-dsa-015",
    domain: "dsa",
    topicSlug: "merge-sort",
    category: "Sorting",
    difficulty: "intermediate",
    type: "concept",
    question: "What is the guaranteed worst-case time complexity of Merge Sort on an array of size n?",
    options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
    correctAnswer: 1,
    explanation: "Merge sort recursively divides the array in half (log n levels) and performs a linear O(n) merge pass at each level, guaranteeing O(n log n) in all cases.",
  },

  // 16. Tree Traversals
  {
    id: "q-dsa-016",
    domain: "dsa",
    topicSlug: "tree-traversal",
    category: "Trees",
    difficulty: "beginner",
    type: "concept",
    question: "Which tree traversal visits nodes in the order: Left Subtree → Root Node → Right Subtree?",
    options: ["Preorder Traversal", "Inorder Traversal", "Postorder Traversal", "Level-order Traversal"],
    correctAnswer: 1,
    explanation: "Inorder traversal visits Left, then Root, then Right. When performed on a valid BST, it produces values in strictly sorted ascending order.",
  },

  // 17. Binary Search Tree Invariant
  {
    id: "q-dsa-017",
    domain: "dsa",
    topicSlug: "binary-search-tree",
    category: "Trees",
    difficulty: "intermediate",
    type: "concept",
    question: "What is the worst-case time complexity of searching for a value in an unbalanced Binary Search Tree of n nodes?",
    options: ["O(log n)", "O(1)", "O(n)", "O(n log n)"],
    correctAnswer: 2,
    explanation: "An unbalanced BST can degenerate into a single linked list chain (e.g. inserting elements in sorted order 1, 2, 3, 4...), causing searches to take O(n) time.",
  },

  // 18. Graph BFS Shortest Path
  {
    id: "q-dsa-018",
    domain: "dsa",
    topicSlug: "bfs",
    category: "Graphs",
    difficulty: "intermediate",
    type: "concept",
    question: "Why does BFS guarantee the shortest path between two vertices in an unweighted graph, while DFS does not?",
    options: [
      "BFS uses less memory than DFS",
      "BFS explores nodes in increasing order of their edge distance layer-by-layer",
      "BFS uses recursion",
      "BFS always visits vertices in numerical order",
    ],
    correctAnswer: 1,
    explanation: "BFS explores all vertices at distance d before touching any vertex at distance d+1, guaranteeing that the first time the target vertex is discovered, the path has minimum edge count.",
  },

  // 19. Topological Sort
  {
    id: "q-dsa-019",
    domain: "dsa",
    topicSlug: "topological-sort",
    category: "Graphs",
    difficulty: "intermediate",
    type: "concept",
    question: "What type of graph is required for a valid Topological Sort to exist?",
    options: [
      "Undirected Acyclic Graph",
      "Directed Acyclic Graph (DAG)",
      "Complete Weighted Graph",
      "Bipartite Connected Graph",
    ],
    correctAnswer: 1,
    explanation: "Topological ordering requires directed edges without cycles (a DAG). If a cycle exists, no linear ordering can satisfy the prerequisites.",
  },

  // 20. Dynamic Programming
  {
    id: "q-dsa-020",
    domain: "dsa",
    topicSlug: "dp-fundamentals",
    category: "Dynamic Programming",
    difficulty: "intermediate",
    type: "concept",
    question: "What two properties define problems solvable via Dynamic Programming?",
    options: [
      "Sorted input and binary searchability",
      "Overlapping Subproblems and Optimal Substructure",
      "Greedy choice property and cycle-free graphs",
      "Divide and conquer without state repetition",
    ],
    correctAnswer: 1,
    explanation: "Dynamic programming memoizes repeated overlapping subproblem computations and reconstructs the global solution from optimal sub-solutions.",
  },
];
