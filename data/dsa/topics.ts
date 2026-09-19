import { Topic } from "@/types/learning";

export const dsaTopics: Topic[] = [
  // ==================== FOUNDATIONS ====================
  {
    id: "topic-prog-fundamentals",
    slug: "programming-fundamentals",
    title: "Programming Fundamentals",
    category: "Foundations",
    description: "Master variables, control flow, loops, functions, memory references, and basic algorithmic thinking.",
    difficulty: 1,
    estimatedMinutes: 45,
    prerequisites: [],
    masteryCriteria: "Comfortably write loops, conditionals, recursive base cases, and manipulate primitive memory references.",
    summary: "The bedrock of all software problem solving: understanding sequential execution, branch conditions, iteration, and memory references.",
    keyConcepts: ["Variables & Scoping", "Conditional Execution", "Loops & Iterators", "Function Calls & Call Stack", "Memory Allocation & Pointers"],
    commonMistakes: ["Off-by-one errors in iteration", "Modifying variables during iteration without index management", "Infinite loops due to missing condition increment"],
    codeExample: {
      language: "typescript",
      code: `function findMax(nums: number[]): number {
  if (nums.length === 0) throw new Error("Empty array");
  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
  }
  return max;
}`,
      explanation: "Iterates through the array once in linear time to identify the maximum element, maintaining an invariant.",
    },
  },
  {
    id: "topic-big-o",
    slug: "big-o-notation",
    title: "Big O Notation",
    category: "Foundations",
    description: "Understand asymptotic upper bounds, growth rates, time and space complexity approximations as input sizes approach infinity.",
    difficulty: 1,
    estimatedMinutes: 60,
    prerequisites: ["programming-fundamentals"],
    masteryCriteria: "Identify best, worst, and average case time and space complexity across standard nested loops, divisions, and recursion.",
    summary: "Big O notation measures algorithm efficiency independently of specific hardware or runtime clock speeds by focusing on dominant growth rates.",
    keyConcepts: ["Asymptotic Growth", "Dominant Terms & Constant Factors", "O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)", "Space Complexity vs Time Complexity"],
    commonMistakes: ["Confusing O(log n) with O(n)", "Ignoring auxiliary space used by the call stack", "Assuming faster clock time equals lower Big O"],
    codeExample: {
      language: "typescript",
      code: `// O(1) Time | O(1) Space
function getFirst(arr: number[]): number {
  return arr[0];
}

// O(n) Time | O(1) Space
function printAll(arr: number[]): void {
  for (const item of arr) console.log(item);
}

// O(n^2) Time | O(1) Space
function printPairs(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}`,
      explanation: "Direct comparison between constant, linear, and quadratic asymptotic complexity classes.",
    },
  },
  {
    id: "topic-complexity-analysis",
    slug: "complexity-analysis",
    title: "Complexity Analysis",
    category: "Foundations",
    description: "Perform rigorous analysis of iterative loops, recursive trees, amortized array expansions, and auxiliary space consumption.",
    difficulty: 2,
    estimatedMinutes: 60,
    prerequisites: ["big-o-notation"],
    masteryCriteria: "Derive Master Theorem bounds, recurrence relations, and amortized cost analyses for dynamic structures.",
    summary: "Deep analysis of edge-case complexity, amortized operations (like vector push_back), and recurrence relations.",
    keyConcepts: ["Amortized Analysis", "Recurrence Relations", "Master Theorem", "Auxiliary Space vs Input Space"],
    commonMistakes: ["Double counting input storage as auxiliary space", "Missing logarithmic tree depth space in recursion"],
  },
  {
    id: "topic-recursion",
    slug: "recursion",
    title: "Recursion",
    category: "Foundations",
    description: "Learn how functions solve problems by reducing them to self-similar sub-problems with explicit base cases.",
    difficulty: 2,
    estimatedMinutes: 75,
    prerequisites: ["programming-fundamentals", "big-o-notation"],
    masteryCriteria: "Decompose problems into base cases, recurrence steps, and trace call stack states and memory usage.",
    summary: "Recursion is a foundational problem-solving paradigm where a function calls itself to break problems into smaller self-contained sub-problems.",
    keyConcepts: ["Base Cases", "Recursive Steps", "Call Stack & Stack Overflow", "Tree of Recursive Invocations", "Tail Call Optimization"],
    commonMistakes: ["Missing or non-exhaustive base case leading to stack overflow", "Redundant recursive recalculations without memoization", "Incorrect return value bubbling"],
    codeExample: {
      language: "typescript",
      code: `function factorial(n: number): number {
  // Base case
  if (n <= 1) return 1;
  // Recursive step
  return n * factorial(n - 1);
}`,
      explanation: "Classic linear recursive function demonstrating the fundamental base condition and recursive descent.",
    },
  },

  // ==================== ARRAYS & STRINGS ====================
  {
    id: "topic-arrays",
    slug: "arrays",
    title: "Arrays",
    category: "Arrays & Strings",
    description: "Explore contiguous memory allocation, zero-indexed random access, cache locality, and element shifting overheads.",
    difficulty: 1,
    estimatedMinutes: 45,
    prerequisites: ["programming-fundamentals"],
    masteryCriteria: "Reason about O(1) index access vs O(n) element insertion/deletion and memory locality implications.",
    summary: "Arrays are contiguous blocks of memory providing blazing O(1) random index access but requiring O(n) shifts for middle insertions.",
    keyConcepts: ["Contiguous Memory", "Index Pointer Arithmetic", "O(1) Access vs O(n) Insertion", "Array Traversal", "In-place Mutation"],
    commonMistakes: ["Out-of-bounds indexing", "Inefficient inserts at index 0 inside loops creating O(n²) bottlenecks"],
  },
  {
    id: "topic-dynamic-arrays",
    slug: "dynamic-arrays",
    title: "Dynamic Arrays",
    category: "Arrays & Strings",
    description: "Understand auto-resizing arrays, capacity doubling, memory reallocation, and amortized O(1) append operations.",
    difficulty: 2,
    estimatedMinutes: 50,
    prerequisites: ["arrays", "complexity-analysis"],
    masteryCriteria: "Explain geometric doubling factor and mathematically prove amortized O(1) append cost.",
    summary: "Dynamic arrays provide flexible-sized collections using geometric buffer resizing when capacity is exhausted.",
    keyConcepts: ["Capacity vs Size", "Geometric Resizing Factor", "Amortized O(1) Append", "Worst-case O(n) Copying"],
    commonMistakes: ["Confusing array length with buffer capacity", "Resizing by constant addition +1 instead of multiplicative factors"],
  },
  {
    id: "topic-strings",
    slug: "strings",
    title: "Strings",
    category: "Arrays & Strings",
    description: "Work with character encodings (ASCII/Unicode), string immutability, builder buffers, and common algorithmic transformations.",
    difficulty: 2,
    estimatedMinutes: 50,
    prerequisites: ["arrays"],
    masteryCriteria: "Manipulate strings efficiently without excessive garbage collection overhead or unintended O(n²) string concatenations.",
    summary: "Strings are character sequences with specific immutability constraints in languages like JavaScript, Python, and Java.",
    keyConcepts: ["ASCII & Unicode Code Points", "String Immutability", "StringBuilder & Array Joins", "Anagrams & Palindromes"],
    commonMistakes: ["Concatenating strings inside loops causing O(n²) memory allocations", "Failing to account for case sensitivity or non-alphanumeric characters"],
  },
  {
    id: "topic-two-pointers",
    slug: "two-pointers",
    title: "Two Pointers",
    category: "Arrays & Strings",
    description: "Optimize search and partitioning from O(n²) to O(n) using opposing or fast/slow index pointer pairs on sorted sequences.",
    difficulty: 2,
    estimatedMinutes: 70,
    prerequisites: ["arrays", "big-o-notation"],
    masteryCriteria: "Apply left/right converging pointers and fast/slow pointer strategies to solve subarray, partition, and target-sum problems in O(n).",
    summary: "The two-pointer technique iterates through linear collections using two coordinate pointers to eliminate nested loop overhead.",
    keyConcepts: ["Converging Pointers (Left & Right)", "Fast & Slow Pointers", "Sorted Array Target Sums", "In-place Array Partitioning"],
    commonMistakes: ["Applying two-pointer convergence on unsorted data without sorting first", "Pointer crossover boundary condition bugs"],
    codeExample: {
      language: "typescript",
      code: `function twoSumSorted(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }
  return [];
}`,
      explanation: "Converges left and right pointers towards the middle to find the target sum in O(n) time and O(1) space.",
    },
  },
  {
    id: "topic-sliding-window",
    slug: "sliding-window",
    title: "Sliding Window",
    category: "Arrays & Strings",
    description: "Maintain a dynamic or fixed-size contiguous range to calculate running aggregates, substrings, and optimal subarrays in linear O(n) time.",
    difficulty: 3,
    estimatedMinutes: 80,
    prerequisites: ["two-pointers", "arrays"],
    masteryCriteria: "Implement fixed and variable-size sliding windows maintaining frequency counts or window invariants in O(n).",
    summary: "Sliding window maintains a contiguous subsegment window, expanding right and shrinking left to avoid recalculating from scratch.",
    keyConcepts: ["Fixed Window Size", "Dynamically Expanding Window", "Shrinking Invariant Condition", "State Hash Maps in Windows"],
    commonMistakes: ["Recalculating entire window sum inside inner loops", "Failing to advance left pointer correctly when invariant breaks"],
    codeExample: {
      language: "typescript",
      code: `function maxSubarraySum(nums: number[], k: number): number {
  let maxSum = 0, windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += nums[i];
  maxSum = windowSum;
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`,
      explanation: "Fixed-size sliding window updates sum in O(1) per step, achieving O(n) total runtime.",
    },
  },
  {
    id: "topic-prefix-sum",
    slug: "prefix-sum",
    title: "Prefix Sum",
    category: "Arrays & Strings",
    description: "Precompute cumulative running totals to answer range sum queries in O(1) time and combine with hash maps for subarray targets.",
    difficulty: 2,
    estimatedMinutes: 60,
    prerequisites: ["arrays", "big-o-notation"],
    masteryCriteria: "Build 1D and 2D prefix arrays and use prefix sum differences with hash maps to find subarray sum counts in O(n).",
    summary: "Prefix sums precompute cumulative totals, allowing any range sum [L, R] to be evaluated in O(1) via prefix[R] - prefix[L-1].",
    keyConcepts: ["1D Prefix Sum Array", "O(1) Range Query Formula", "Subarray Sum Equals K with Hash Tables", "2D Matrix Prefix Sums"],
    commonMistakes: ["Off-by-one errors when handling left boundary at index 0", "Not handling negative values when calculating target sums"],
  },

  // ==================== LINKED LISTS ====================
  {
    id: "topic-singly-linked-lists",
    slug: "singly-linked-lists",
    title: "Singly Linked Lists",
    category: "Linked Lists",
    description: "Study node-pointer structures, dynamic memory dispersion, head/tail pointers, and non-contiguous sequence management.",
    difficulty: 2,
    estimatedMinutes: 60,
    prerequisites: ["programming-fundamentals", "big-o-notation"],
    masteryCriteria: "Implement insert, delete, traversal, reverse, and dummy head pointer operations cleanly without losing references.",
    summary: "Linked lists chain heap-allocated node elements with explicit next pointers, providing O(1) insertion at known references.",
    keyConcepts: ["Node References & Next Pointers", "Sentinel/Dummy Head Technique", "In-place List Reversal", "Pointer Dereferencing"],
    commonMistakes: ["Losing the reference to the next node before re-pointing", "Dereferencing null pointer on empty list or tail node"],
    codeExample: {
      language: "typescript",
      code: `class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;
  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`,
      explanation: "Iteratively reverses pointer directions in a single O(n) pass with O(1) space.",
    },
  },
  {
    id: "topic-doubly-linked-lists",
    slug: "doubly-linked-lists",
    title: "Doubly Linked Lists",
    category: "Linked Lists",
    description: "Implement bidirectional node references with next and prev pointers to support O(1) arbitrary node deletion and LRU cache structures.",
    difficulty: 2,
    estimatedMinutes: 60,
    prerequisites: ["singly-linked-lists"],
    masteryCriteria: "Construct bidirectional pointer links and maintain sentinel head and tail nodes for edge-case free operations.",
    summary: "Doubly linked lists store both next and prev pointers on every node, enabling O(1) removal of any known node reference.",
    keyConcepts: ["Prev and Next Pointers", "Sentinel Head & Tail Nodes", "O(1) Node Eviction", "LRU Cache Architecture"],
    commonMistakes: ["Updating next pointer but forgetting to update prev pointer", "Memory leaks in languages without automatic garbage collection"],
  },
  {
    id: "topic-fast-and-slow-pointers",
    slug: "fast-and-slow-pointers",
    title: "Fast & Slow Pointers",
    category: "Linked Lists",
    description: "Detect cycles, find middle nodes, and calculate cycle entry points using Floyd's Tortoise and Hare pointer algorithm.",
    difficulty: 3,
    estimatedMinutes: 65,
    prerequisites: ["singly-linked-lists", "two-pointers"],
    masteryCriteria: "Prove Floyd's cycle detection mathematical invariant and find cycle start node in O(n) time and O(1) space.",
    summary: "Advancing one pointer at 2x speed and another at 1x speed allows cycle detection and midpoint discovery without hash sets.",
    keyConcepts: ["Floyd's Tortoise & Hare Algorithm", "Cycle Detection", "List Middle Node in One Pass", "Cycle Entry Point Derivation"],
    commonMistakes: ["Failing to check fast.next !== null before accessing fast.next.next", "Assuming pointers meet at the cycle entry node"],
  },

  // ==================== STACKS & QUEUES ====================
  {
    id: "topic-stack",
    slug: "stack",
    title: "Stack",
    category: "Stacks & Queues",
    description: "Master Last-In First-Out (LIFO) discipline, call stack emulation, parenthesis balancing, and arithmetic expression evaluation.",
    difficulty: 1,
    estimatedMinutes: 45,
    prerequisites: ["arrays"],
    masteryCriteria: "Implement stack operations using arrays and linked lists, and solve bracket matching and postfix evaluation problems.",
    summary: "Stacks enforce strict LIFO ordering, serving as the foundational tool for nested structure parsing and backtrack states.",
    keyConcepts: ["LIFO (Last-In First-Out)", "Push, Pop, Peek Operations", "Matching Balanced Brackets", "Call Stack Simulation"],
    commonMistakes: ["Popping from an empty stack without safety check", "Using O(n) array shift instead of O(1) push/pop"],
    codeExample: {
      language: "typescript",
      code: `function isValidParentheses(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,
      explanation: "Uses a stack to verify symmetric matching of nested brackets in O(n) time.",
    },
  },
  {
    id: "topic-queue",
    slug: "queue",
    title: "Queue",
    category: "Stacks & Queues",
    description: "Understand First-In First-Out (FIFO) processing, circular buffers, task scheduling, and breadth-first search queues.",
    difficulty: 2,
    estimatedMinutes: 50,
    prerequisites: ["arrays", "singly-linked-lists"],
    masteryCriteria: "Implement FIFO queues using circular ring buffers or linked nodes with O(1) enqueue and dequeue operations.",
    summary: "Queues enforce FIFO ordering, providing order-preserving processing for message buffers and breadth-first search traversals.",
    keyConcepts: ["FIFO (First-In First-Out)", "Enqueue and Dequeue", "Circular Ring Buffer", "BFS Traversal Pipeline"],
    commonMistakes: ["Using Array.prototype.shift() in JavaScript which causes O(n) element reindexing instead of O(1)"],
  },
  {
    id: "topic-deque",
    slug: "deque",
    title: "Deque",
    category: "Stacks & Queues",
    description: "Double-ended queues allowing O(1) insertion and deletion at both ends, essential for sliding window maximum problems.",
    difficulty: 3,
    estimatedMinutes: 60,
    prerequisites: ["queue", "stack", "doubly-linked-lists"],
    masteryCriteria: "Implement double-ended queue operations and utilize monotonic deques to solve sliding window extrema in O(n).",
    summary: "Deques support pushing and popping from both front and rear in O(1) time.",
    keyConcepts: ["Double-Ended Queue", "Front & Rear Operations", "Sliding Window Extrema", "Array Deque Implementation"],
    commonMistakes: ["Failing to maintain monotonic invariants when popping from rear"],
  },
  {
    id: "topic-monotonic-stack",
    slug: "monotonic-stack",
    title: "Monotonic Stack",
    category: "Stacks & Queues",
    description: "Maintain strictly increasing or decreasing stack orders to solve Next Greater Element and largest histogram problems in linear time.",
    difficulty: 3,
    estimatedMinutes: 75,
    prerequisites: ["stack"],
    masteryCriteria: "Identify when a problem requires finding nearest greater/smaller elements and solve with monotonic stack in O(n).",
    summary: "A monotonic stack preserves elements in sorted order by popping elements that violate monotonicity, finding neighbors in O(n).",
    keyConcepts: ["Monotonically Increasing/Decreasing Stacks", "Next Greater Element Pattern", "Histogram Largest Rectangle", "Trapping Rain Water"],
    commonMistakes: ["Storing element values instead of element indices in the stack", "Confusing strictly increasing vs non-decreasing equality conditions"],
  },

  // ==================== HASHING ====================
  {
    id: "topic-hash-tables",
    slug: "hash-tables",
    title: "Hash Tables",
    category: "Hashing",
    description: "Explore hash functions, bucket arrays, collision resolution (chaining vs open addressing), and load factor resizing.",
    difficulty: 2,
    estimatedMinutes: 60,
    prerequisites: ["arrays", "complexity-analysis"],
    masteryCriteria: "Explain average O(1) vs worst-case O(n) hash lookups, hash collision mechanisms, and implement two-sum in linear time.",
    summary: "Hash tables map arbitrary keys to array buckets via hash codes, providing average O(1) key-value insertion, lookup, and deletion.",
    keyConcepts: ["Hash Functions & Uniform Distribution", "Collision Resolution (Chaining vs Open Addressing)", "Load Factor & Re-hashing", "Average O(1) vs Worst Case O(n)"],
    commonMistakes: ["Using mutable objects as keys without custom hash/equality contracts", "Assuming O(1) worst-case performance under malicious hash collisions"],
    codeExample: {
      language: "typescript",
      code: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      explanation: "Replaces O(n²) brute force search with O(n) hash table lookups.",
    },
  },
  {
    id: "topic-hash-sets",
    slug: "hash-sets",
    title: "Hash Sets",
    category: "Hashing",
    description: "Leverage unique element sets for O(1) membership testing, deduplication, and intersection calculations.",
    difficulty: 1,
    estimatedMinutes: 40,
    prerequisites: ["hash-tables"],
    masteryCriteria: "Utilize sets for deduplication, cycle detection in values, and set union/difference operations in O(n).",
    summary: "A hash set is a collection of unique keys backed by a hash table, ensuring O(1) lookup and element uniqueness.",
    keyConcepts: ["Set Membership Testing", "Deduplication", "Mathematical Set Operations", "Value-based Cycle Detection"],
    commonMistakes: ["Iterating over sets with nested lookup loops unnecessarily", "Not handling object reference equality differences in sets"],
  },
  {
    id: "topic-frequency-counting",
    slug: "frequency-counting",
    title: "Frequency Counting",
    category: "Hashing",
    description: "Count character and element occurrences with hash maps or direct-address frequency arrays to solve anagram and majority problems.",
    difficulty: 1,
    estimatedMinutes: 45,
    prerequisites: ["hash-tables", "strings"],
    masteryCriteria: "Use frequency maps and fixed-size arrays for anagram checking, top-k frequent element tracking, and Boyer-Moore voting.",
    summary: "Tallying item counts using hash maps or direct-indexed arrays allows instant comparison of distributions and frequencies.",
    keyConcepts: ["Frequency Hash Maps", "Direct-Address Fixed Arrays (26 chars)", "Valid Anagram Verification", "Majority Element Patterns"],
    commonMistakes: ["Creating full hash maps when fixed size 26-char integer array is faster", "Forgetting to clean up zero-count map keys"],
  },

  // ==================== SEARCHING ====================
  {
    id: "topic-linear-search",
    slug: "linear-search",
    title: "Linear Search",
    category: "Searching",
    description: "Understand sequential search through unsorted collections with O(n) time complexity and early exit optimizations.",
    difficulty: 1,
    estimatedMinutes: 30,
    prerequisites: ["arrays"],
    masteryCriteria: "Compare linear scan trade-offs on unsorted collections against upfront sorting costs.",
    summary: "Scanning elements one by one from start to finish is the only universal search method for unsorted, unstructured data.",
    keyConcepts: ["Sequential Scan", "O(n) Worst and Average Case", "Early Termination", "Search in Unsorted Data"],
    commonMistakes: ["Sorting unsorted data for a single search query, turning O(n) into O(n log n)"],
  },
  {
    id: "topic-binary-search",
    slug: "binary-search",
    title: "Binary Search",
    category: "Searching",
    description: "Divide search intervals in half on sorted arrays to achieve O(log n) time complexity, handling boundary invariants meticulously.",
    difficulty: 2,
    estimatedMinutes: 70,
    prerequisites: ["arrays", "big-o-notation"],
    masteryCriteria: "Write bug-free binary search implementations with correct mid-point calculation avoiding integer overflow and boundary crossover.",
    summary: "Binary search repeatedly halves the search space of sorted data, achieving logarithmic O(log n) efficiency.",
    keyConcepts: ["Sorted Array Prerequisite", "Logarithmic Halving O(log n)", "Mid Calculation without Integer Overflow", "Search Space Invariant [left, right]"],
    commonMistakes: ["Integer overflow with (left + right) / 2 instead of left + Math.floor((right - left) / 2)", "Off-by-one infinite loop when left <= right vs left < right"],
    codeExample: {
      language: "typescript",
      code: `function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`,
      explanation: "Halves search range every iteration, returning index or -1 in O(log n) time.",
    },
  },
  {
    id: "topic-binary-search-variations",
    slug: "binary-search-variations",
    title: "Binary Search Variations",
    category: "Searching",
    description: "Extend binary search to find first/last occurrences, search in rotated sorted arrays, and binary search on answer spaces (monotonic predicates).",
    difficulty: 3,
    estimatedMinutes: 80,
    prerequisites: ["binary-search"],
    masteryCriteria: "Apply binary search on answer spaces (e.g. Koko eating bananas, capacity to ship packages) and handle rotated pivot arrays.",
    summary: "Binary search generalizes to any monotonic boolean predicate function f(x), finding boundaries and rotated pivots.",
    keyConcepts: ["Lower Bound & Upper Bound", "Rotated Sorted Array Search", "Binary Search on Monotonic Answer Space", "Peak Finding"],
    commonMistakes: ["Failing to prove predicate monotonicity before applying binary search on answers", "Incorrect pivot element comparisons"],
  },

  // ==================== SORTING ====================
  {
    id: "topic-bubble-sort",
    slug: "bubble-sort",
    title: "Bubble Sort",
    category: "Sorting",
    description: "Learn adjacent swap sorting, pass optimizations, stability properties, and O(n²) worst-case mechanics.",
    difficulty: 1,
    estimatedMinutes: 35,
    prerequisites: ["arrays", "big-o-notation"],
    masteryCriteria: "Explain bubble sort mechanics, stability, and early-termination optimization for already sorted arrays.",
    summary: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    keyConcepts: ["Adjacent Element Swapping", "O(n²) Time Complexity", "Stable Sorting Property", "Early Exit Flag"],
    commonMistakes: ["Continuing to iterate when no swaps occurred in the previous pass"],
  },
  {
    id: "topic-insertion-sort",
    slug: "insertion-sort",
    title: "Insertion Sort",
    category: "Sorting",
    description: "Build a sorted sub-array one element at a time, achieving O(n) best-case performance on nearly-sorted data.",
    difficulty: 1,
    estimatedMinutes: 40,
    prerequisites: ["arrays", "big-o-notation"],
    masteryCriteria: "Explain why insertion sort is favored in hybrid algorithms like TimSort for small or nearly sorted arrays.",
    summary: "Inserts each item into its proper position in the already-sorted prefix, highly efficient for small array sizes.",
    keyConcepts: ["Incremental Sorted Subarray", "O(n) Best Case on Nearly-Sorted Data", "In-Place & Stable", "Low Constant Overhead"],
    commonMistakes: ["Using extra memory instead of shifting elements in-place"],
  },
  {
    id: "topic-selection-sort",
    slug: "selection-sort",
    title: "Selection Sort",
    category: "Sorting",
    description: "Repeatedly find minimum elements from the unsorted segment and place them at the beginning in O(n²) time.",
    difficulty: 1,
    estimatedMinutes: 35,
    prerequisites: ["arrays", "big-o-notation"],
    masteryCriteria: "Differentiate selection sort (always O(n²) comparisons, minimum writes) from insertion sort.",
    summary: "Divides list into sorted and unsorted portions, selecting the minimum unsorted item and swapping it forward.",
    keyConcepts: ["Minimum Element Selection", "Strict O(n²) Comparisons", "Minimum Swaps O(n)", "Unstable In-place Variant"],
    commonMistakes: ["Assuming selection sort benefits from already-sorted data (it always takes O(n²) comparisons)"],
  },
  {
    id: "topic-merge-sort",
    slug: "merge-sort",
    title: "Merge Sort",
    category: "Sorting",
    description: "Master divide-and-conquer sorting, recursive splitting, linear merge passes, and guaranteed O(n log n) runtime.",
    difficulty: 2,
    estimatedMinutes: 70,
    prerequisites: ["recursion", "complexity-analysis", "arrays"],
    masteryCriteria: "Implement recursive merge sort and two-pointer array merge with guaranteed O(n log n) time and O(n) space.",
    summary: "Divide-and-conquer algorithm that divides array in halves, sorts them recursively, and merges the sorted halves.",
    keyConcepts: ["Divide and Conquer Strategy", "Guaranteed O(n log n) Time", "O(n) Auxiliary Space", "Stable Sorting Guarantee"],
    commonMistakes: ["Allocating new arrays on every recursive sub-merge without reusing scratch buffers", "Incorrect index offsets when merging sub-ranges"],
  },
  {
    id: "topic-quick-sort",
    slug: "quick-sort",
    title: "Quick Sort",
    category: "Sorting",
    description: "Understand in-place partitioning schemes (Lomuto vs Hoare), pivot selection strategies, and average O(n log n) sorting.",
    difficulty: 3,
    estimatedMinutes: 75,
    prerequisites: ["recursion", "complexity-analysis", "two-pointers"],
    masteryCriteria: "Implement Hoare or Lomuto partitioning in-place and explain randomized pivot selection to prevent worst-case O(n²).",
    summary: "Picks an element as pivot and partitions the array around it, sorting recursively in-place with low constant factors.",
    keyConcepts: ["Pivot Selection", "Lomuto & Hoare Partitioning Schemes", "Average O(n log n) vs Worst-case O(n²)", "In-place Sorting & Recursion Depth"],
    commonMistakes: ["Always choosing index 0 as pivot leading to O(n²) on sorted input", "Stack overflow on large inputs without tail recursion elimination"],
  },
  {
    id: "topic-heap-sort",
    slug: "heap-sort",
    title: "Heap Sort",
    category: "Sorting",
    description: "Leverage binary heap data structures to achieve guaranteed O(n log n) sorting in-place with O(1) auxiliary space.",
    difficulty: 3,
    estimatedMinutes: 65,
    prerequisites: ["complexity-analysis", "arrays"],
    masteryCriteria: "Build max-heap in O(n) and perform in-place heap sort in O(n log n) with O(1) extra space.",
    summary: "Converts array into a max heap, repeatedly extracts maximum and restores heap property in-place.",
    keyConcepts: ["Binary Heap Invariant", "O(n) Heapify Construction", "O(n log n) In-Place Sorting", "O(1) Auxiliary Space"],
    commonMistakes: ["Confusing O(n) heap construction with O(n log n) sequential insertions"],
  },

  // ==================== TREES ====================
  {
    id: "topic-binary-trees",
    slug: "binary-trees",
    title: "Binary Trees",
    category: "Trees",
    description: "Explore hierarchical tree node structures, parent-child relationships, leaf nodes, depth, height, and complete trees.",
    difficulty: 2,
    estimatedMinutes: 55,
    prerequisites: ["recursion", "singly-linked-lists"],
    masteryCriteria: "Calculate tree height, diameter, node counts, and validate structural tree properties recursively.",
    summary: "Hierarchical data structure where each node has at most two children, known as the left and right child.",
    keyConcepts: ["Root, Leaves, and Internal Nodes", "Height vs Depth", "Full, Complete, and Perfect Binary Trees", "Recursive Tree Invariants"],
    commonMistakes: ["Confusing tree height (edges to leaf) with tree depth (edges from root)", "Null pointer dereferencing on leaf children"],
  },
  {
    id: "topic-tree-traversal",
    slug: "tree-traversal",
    title: "Tree Traversal",
    category: "Trees",
    description: "Master depth-first traversals (Inorder, Preorder, Postorder) and breadth-first level-order traversal using queues.",
    difficulty: 2,
    estimatedMinutes: 70,
    prerequisites: ["binary-trees", "queue", "stack"],
    masteryCriteria: "Implement recursive and iterative preorder, inorder, postorder, and level-order BFS traversals in O(n) time.",
    summary: "Systematically visiting every node in a tree either depth-first (Pre/In/Postorder) or breadth-first (Level-order).",
    keyConcepts: ["Preorder (Root, Left, Right)", "Inorder (Left, Root, Right)", "Postorder (Left, Right, Root)", "Level-Order BFS Traversal with Queue"],
    commonMistakes: ["Using recursion for level-order traversal instead of a FIFO queue", "Mixing up node visit order in recursive calls"],
    codeExample: {
      language: "typescript",
      code: `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val: number) { this.val = val; }
}

function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  function dfs(node: TreeNode | null) {
    if (!node) return;
    dfs(node.left);
    result.push(node.val);
    dfs(node.right);
  }
  dfs(root);
  return result;
}`,
      explanation: "Inorder traversal visits left subtree, root, then right subtree, producing sorted output on a BST.",
    },
  },
  {
    id: "topic-binary-search-tree",
    slug: "binary-search-tree",
    title: "Binary Search Tree (BST)",
    category: "Trees",
    description: "Study BST ordering invariant (left < root < right), logarithmic search, insertion, deletion, and LCA finding.",
    difficulty: 2,
    estimatedMinutes: 75,
    prerequisites: ["tree-traversal", "binary-search"],
    masteryCriteria: "Validate BST invariants, perform O(h) search/insert/delete, and find lowest common ancestors.",
    summary: "A binary tree where every node satisfies: all left subtree keys < node key < all right subtree keys.",
    keyConcepts: ["BST Invariant", "O(h) Search, Insert, and Deletion", "Inorder Traversal Produces Sorted Sequence", "Lowest Common Ancestor (LCA)"],
    commonMistakes: ["Only checking immediate children instead of validating entire subtree ranges with min/max bounds", "Incorrect node replacement during deletion of nodes with two children"],
  },
  {
    id: "topic-balanced-trees",
    slug: "balanced-trees",
    title: "Balanced Trees (AVL & Red-Black)",
    category: "Trees",
    description: "Understand tree rotations, height balancing criteria, and guaranteed O(log n) worst-case search times.",
    difficulty: 4,
    estimatedMinutes: 80,
    prerequisites: ["binary-search-tree"],
    masteryCriteria: "Explain single and double tree rotations, balance factors, and how self-balancing prevents degenerate O(n) linked lists.",
    summary: "Self-balancing binary search trees maintain logarithmic height bounds through automatic tree rotations upon mutations.",
    keyConcepts: ["Tree Rotations (Left & Right)", "AVL Balance Factor", "Red-Black Tree Color Invariants", "Guaranteed O(log n) Bounds"],
    commonMistakes: ["Failing to update parent pointers during rotation steps", "Confusing single rotation with double LR/RL rotation cases"],
  },
  {
    id: "topic-heaps",
    slug: "heaps",
    title: "Heaps",
    category: "Trees",
    description: "Explore complete binary trees represented as arrays, heap-order properties (min-heap / max-heap), and sift-up/sift-down mechanics.",
    difficulty: 2,
    estimatedMinutes: 65,
    prerequisites: ["binary-trees", "arrays"],
    masteryCriteria: "Represent heaps in contiguous arrays using index arithmetic (2i+1, 2i+2) and implement sift operations.",
    summary: "A heap is a specialized complete binary tree satisfying the heap property: parent is always smaller (min-heap) or larger (max-heap) than its children.",
    keyConcepts: ["Complete Binary Tree Property", "Array Index Mapping (2i+1, 2i+2, floor((i-1)/2))", "Sift-Up (Bubble Up) & Sift-Down (Bubble Down)", "O(log n) Insert and Extract-Min"],
    commonMistakes: ["Assuming a heap is fully sorted like a BST (heaps only maintain ancestor-descendant ordering)", "Off-by-one errors in parent/child index formulas"],
  },
  {
    id: "topic-priority-queues",
    slug: "priority-queues",
    title: "Priority Queues",
    category: "Trees",
    description: "Apply priority queues to solve Top-K Frequent Elements, Merge K Sorted Lists, and running median algorithms.",
    difficulty: 3,
    estimatedMinutes: 70,
    prerequisites: ["heaps", "queue"],
    masteryCriteria: "Choose between min-heap and max-heap to solve Kth largest/smallest problems in O(n log k) instead of O(n log n).",
    summary: "Priority queue abstracts element retrieval based on priority weights, backed by binary or Fibonacci heaps.",
    keyConcepts: ["Min-Heap vs Max-Heap Selection", "Top-K Elements in O(n log k)", "Merge K Sorted Streams", "Two-Heap Running Median"],
    commonMistakes: ["Using max-heap for Kth largest when maintaining a min-heap of size K is far more memory and time efficient"],
  },
  {
    id: "topic-tries",
    slug: "tries",
    title: "Tries (Prefix Trees)",
    category: "Trees",
    description: "Build prefix trees for O(L) string search, autocomplete suggestions, dictionary word validations, and prefix matching.",
    difficulty: 3,
    estimatedMinutes: 75,
    prerequisites: ["tree-traversal", "strings", "hash-tables"],
    masteryCriteria: "Implement TrieNode structure with insert, search, and startsWith operations in O(L) string length time.",
    summary: "Tries are multi-way tree structures optimized for storing strings where nodes represent shared prefix characters.",
    keyConcepts: ["Prefix Tree Node Structure", "O(L) Word Insertion and Lookup", "Prefix Autocomplete", "Bitwise Trie for Maximum XOR"],
    commonMistakes: ["Forgetting to mark isEndOfWord boolean flag on terminal nodes", "Over-allocating node arrays when hash map child lookup is more compact"],
  },

  // ==================== GRAPHS ====================
  {
    id: "topic-graph-representation",
    slug: "graph-representation",
    title: "Graph Representation",
    category: "Graphs",
    description: "Compare adjacency lists, adjacency matrices, edge lists, directed vs undirected graphs, and weighted graphs.",
    difficulty: 2,
    estimatedMinutes: 50,
    prerequisites: ["arrays", "hash-tables"],
    masteryCriteria: "Select appropriate graph representation based on sparsity (O(V+E) adjacency list vs O(V²) adjacency matrix).",
    summary: "Graphs consist of vertices (nodes) connected by edges, modeled programmatically via adjacency lists or matrices.",
    keyConcepts: ["Vertices & Edges", "Adjacency List (Sparse Graphs)", "Adjacency Matrix (Dense Graphs)", "Directed, Undirected & Weighted Graphs"],
    commonMistakes: ["Using adjacency matrix for sparse graphs with 10^5 vertices causing out-of-memory errors", "Forgetting to add bidirectional edges in undirected graphs"],
  },
  {
    id: "topic-bfs",
    slug: "bfs",
    title: "Breadth-First Search (BFS)",
    category: "Graphs",
    description: "Traverse graphs layer by layer using queues to guarantee shortest path discovery on unweighted graphs.",
    difficulty: 2,
    estimatedMinutes: 70,
    prerequisites: ["graph-representation", "queue", "hash-sets"],
    masteryCriteria: "Implement queue-based BFS with visited tracking set to find shortest paths in unweighted graphs in O(V + E) time.",
    summary: "BFS explores all neighboring vertices at the current distance depth before moving on to vertices at the next depth level.",
    keyConcepts: ["Queue-Driven Exploration", "Visited Set to Prevent Cycles", "Unweighted Shortest Path Guarantee", "Multi-Source BFS Pattern"],
    commonMistakes: ["Marking nodes as visited when popped from queue instead of when pushed, causing duplicate queue entries and exponential memory blowup"],
    codeExample: {
      language: "typescript",
      code: `function bfs(start: number, adj: number[][]): number[] {
  const visited = new Set<number>([start]);
  const queue: number[] = [start];
  const order: number[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);
    for (const neighbor of adj[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
      explanation: "Explores graph in level-order, finding unweighted shortest distances in O(V + E).",
    },
  },
  {
    id: "topic-dfs",
    slug: "dfs",
    title: "Depth-First Search (DFS)",
    category: "Graphs",
    description: "Explore deep graph paths using recursion or stacks, detecting cycles, exploring connected islands, and backtrack pathways.",
    difficulty: 2,
    estimatedMinutes: 70,
    prerequisites: ["graph-representation", "recursion", "hash-sets"],
    masteryCriteria: "Write recursive and iterative DFS with visited arrays, handling connected component counting and cycle detection in O(V + E).",
    summary: "DFS explores as far as possible along each branch before backtracking, utilizing the recursion call stack.",
    keyConcepts: ["Recursive Call Stack", "Visited State Tracking (White/Gray/Black)", "Connected Component Exploration", "Cycle Detection in Directed Graphs"],
    commonMistakes: ["Stack overflow on deep linear graphs in recursion", "Failing to backtrack visited state when exploring all paths"],
  },
  {
    id: "topic-connected-components",
    slug: "connected-components",
    title: "Connected Components",
    category: "Graphs",
    description: "Count and identify isolated subgraphs and grid islands using DFS, BFS, and flood-fill techniques.",
    difficulty: 2,
    estimatedMinutes: 60,
    prerequisites: ["dfs", "bfs"],
    masteryCriteria: "Count isolated components in general graphs and solve grid-based flood fill/island counting in O(R * C).",
    summary: "Identifies maximal subgraphs where every vertex is reachable from any other vertex in the same subgraph.",
    keyConcepts: ["Component Count Loop", "Grid Matrix as Graph (4-directional / 8-directional)", "Number of Islands Pattern", "Flood Fill Algorithm"],
    commonMistakes: ["Modifying grid in-place without checking bounds", "Visiting previously processed cells repeatedly"],
  },
  {
    id: "topic-topological-sort",
    slug: "topological-sort",
    title: "Topological Sort",
    category: "Graphs",
    description: "Linear ordering of vertices in Directed Acyclic Graphs (DAG) using Kahn's in-degree queue algorithm or post-order DFS.",
    difficulty: 3,
    estimatedMinutes: 75,
    prerequisites: ["graph-representation", "queue", "dfs"],
    masteryCriteria: "Implement Kahn's algorithm (in-degree array + queue) and detect cycles in prerequisite dependency graphs in O(V + E).",
    summary: "Linear ordering of vertices in a DAG such that for every directed edge u -> v, vertex u comes before v.",
    keyConcepts: ["DAG (Directed Acyclic Graph)", "Kahn's Algorithm (In-degree Array)", "Course Schedule Pattern", "Cycle Detection via Processed Count"],
    commonMistakes: ["Applying topological sort on graphs with directed cycles without cycle detection check"],
  },
  {
    id: "topic-shortest-path",
    slug: "shortest-path",
    title: "Shortest Path Fundamentals",
    category: "Graphs",
    description: "Understand shortest path problems across unweighted, positive-weighted, and negative-weighted graphs.",
    difficulty: 3,
    estimatedMinutes: 60,
    prerequisites: ["bfs", "graph-representation"],
    masteryCriteria: "Choose between BFS (unweighted), Dijkstra (non-negative weights), and Bellman-Ford (negative weights).",
    summary: "Systematic comparison of path-finding algorithms across varying graph topology constraints.",
    keyConcepts: ["Path Relaxation", "Unweighted BFS Distance", "Non-negative Weights", "Negative Cycles"],
    commonMistakes: ["Attempting to use BFS on weighted graphs expecting shortest path guarantees"],
  },
  {
    id: "topic-dijkstra",
    slug: "dijkstra",
    title: "Dijkstra's Algorithm",
    category: "Graphs",
    description: "Find shortest paths from a source to all vertices in non-negative weighted graphs using min-priority queues in O((V+E) log V).",
    difficulty: 4,
    estimatedMinutes: 80,
    prerequisites: ["shortest-path", "priority-queues"],
    masteryCriteria: "Implement Dijkstra's algorithm with a min-priority queue and explain why it fails with negative edge weights.",
    summary: "Greedy shortest path algorithm that continually relaxes the closest unvisited node using a min-heap.",
    keyConcepts: ["Min-Heap Optimization", "Greedy Edge Relaxation", "Distance Array Tracking", "Non-Negative Weight Invariant"],
    commonMistakes: ["Using Dijkstra on graphs containing negative edge weights", "Forgetting to skip stale distance entries popped from heap"],
  },
  {
    id: "topic-union-find",
    slug: "union-find",
    title: "Union Find (Disjoint Set Union)",
    category: "Graphs",
    description: "Maintain partition of elements into disjoint sets with near-constant O(α(n)) find and union operations via path compression.",
    difficulty: 3,
    estimatedMinutes: 75,
    prerequisites: ["arrays", "tree-traversal"],
    masteryCriteria: "Implement DSU with Path Compression and Union by Rank/Size, achieving inverse Ackermann O(α(n)) amortized complexity.",
    summary: "Data structure that tracks elements split into one or more disjoint sets, providing lightning-fast connectivity checks and merging.",
    keyConcepts: ["Find with Path Compression", "Union by Rank/Size", "Inverse Ackermann Complexity O(α(n))", "Cycle Detection in Undirected Graphs"],
    commonMistakes: ["Omitting path compression, degrading find operations to O(n)", "Merging parent nodes directly without calling find(root) first"],
  },
  {
    id: "topic-minimum-spanning-tree",
    slug: "minimum-spanning-tree",
    title: "Minimum Spanning Tree (Kruskal & Prim)",
    category: "Graphs",
    description: "Find subgraph spanning all vertices with minimal total edge weight using Kruskal's (DSU) or Prim's (Heap) algorithms.",
    difficulty: 4,
    estimatedMinutes: 80,
    prerequisites: ["union-find", "priority-queues", "graph-representation"],
    masteryCriteria: "Implement Kruskal's algorithm using edge sorting + DSU and Prim's algorithm using priority queue in O(E log E).",
    summary: "An MST connects all graph vertices together without cycles and with the minimum possible total edge weight.",
    keyConcepts: ["Kruskal's Algorithm (Sort Edges + DSU)", "Prim's Algorithm (Cut Property + Priority Queue)", "Cut and Cycle Properties", "Spanning Tree Invariants (V-1 Edges)"],
    commonMistakes: ["Running Kruskal without sorting edges first", "Applying MST on disconnected graphs (creates Minimum Spanning Forest)"],
  },

  // ==================== GREEDY ====================
  {
    id: "topic-greedy-fundamentals",
    slug: "greedy-fundamentals",
    title: "Greedy Fundamentals",
    category: "Greedy",
    description: "Understand optimal substructure and greedy-choice property: making locally optimal choices leading to globally optimal solutions.",
    difficulty: 2,
    estimatedMinutes: 60,
    prerequisites: ["sorting", "big-o-notation"],
    masteryCriteria: "Prove when a greedy strategy produces optimal solutions vs when dynamic programming is required.",
    summary: "Greedy algorithms make the locally best choice at each step without ever reconsidering previous choices.",
    keyConcepts: ["Greedy Choice Property", "Optimal Substructure", "Exchange Arguments & Proof of Correctness", "Greedy vs Dynamic Programming"],
    commonMistakes: ["Assuming a greedy approach works without verifying greedy choice property (e.g. standard coin change with arbitrary coins)"],
  },
  {
    id: "topic-interval-problems",
    slug: "interval-problems",
    title: "Interval Problems",
    category: "Greedy",
    description: "Solve interval scheduling, interval merging, meeting rooms, and non-overlapping interval problems using sorted endpoints.",
    difficulty: 3,
    estimatedMinutes: 70,
    prerequisites: ["greedy-fundamentals", "arrays"],
    masteryCriteria: "Sort intervals by start or end times and solve merge intervals, insert interval, and meeting rooms problems in O(n log n).",
    summary: "Problems involving overlapping time ranges or numeric intervals [start, end], typically resolved by strategic sorting.",
    keyConcepts: ["Sorting by Start Time vs End Time", "Interval Merging Logic", "Min Meeting Rooms with Min-Heap", "Non-overlapping Interval Maximization"],
    commonMistakes: ["Sorting by start time when sorting by end time is mathematically required for activity selection"],
  },
  {
    id: "topic-activity-selection",
    slug: "activity-selection",
    title: "Activity Selection",
    category: "Greedy",
    description: "Select the maximum number of mutually compatible activities scheduled over a single shared resource.",
    difficulty: 2,
    estimatedMinutes: 50,
    prerequisites: ["greedy-fundamentals", "interval-problems"],
    masteryCriteria: "Prove optimality of earliest finish time selection and implement in O(n log n).",
    summary: "Select maximum non-overlapping tasks by always choosing the activity that finishes earliest.",
    keyConcepts: ["Earliest Finish Time Strategy", "Mutual Compatibility Invariant", "Greedy Proof via Exchange Argument"],
    commonMistakes: ["Selecting tasks by shortest duration instead of earliest finish time"],
  },

  // ==================== DYNAMIC PROGRAMMING ====================
  {
    id: "topic-dp-fundamentals",
    slug: "dp-fundamentals",
    title: "DP Fundamentals",
    category: "Dynamic Programming",
    description: "Master memoization (top-down) and tabulation (bottom-up) for problems exhibiting overlapping subproblems and optimal substructure.",
    difficulty: 3,
    estimatedMinutes: 80,
    prerequisites: ["recursion", "hash-tables", "complexity-analysis"],
    masteryCriteria: "Transform exponential recursive solutions into polynomial time using top-down memoization and bottom-up DP tables.",
    summary: "Dynamic Programming solves complex problems by breaking them down into simpler overlapping subproblems and caching results.",
    keyConcepts: ["Overlapping Subproblems", "Optimal Substructure", "Top-Down DP (Recursion + Memoization)", "Bottom-Up DP (Iterative Tabulation)", "State Definition & Base Cases"],
    commonMistakes: ["Failing to recognize overlapping subproblems", "Incorrect base case initialization in DP tables", "Forgetting to memoize all parameters that define unique states"],
    codeExample: {
      language: "typescript",
      code: `// Fibonacci Tabulation O(n) Time | O(1) Space
function fib(n: number): number {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
      explanation: "Bottom-up tabulation with space optimization computes state transitions in linear time with O(1) memory.",
    },
  },
  {
    id: "topic-1d-dp",
    slug: "1d-dp",
    title: "1D Dynamic Programming",
    category: "Dynamic Programming",
    description: "Solve linear state progression problems including Climbing Stairs, House Robber, Coin Change, and Decode Ways.",
    difficulty: 3,
    estimatedMinutes: 75,
    prerequisites: ["dp-fundamentals"],
    masteryCriteria: "Formulate 1D state recurrence relations, transition equations, and optimize auxiliary space to O(1) when possible.",
    summary: "Problems where the state at step i depends on a fixed constant number of previous sub-states (e.g. dp[i] = dp[i-1] + dp[i-2]).",
    keyConcepts: ["Climbing Stairs Pattern", "House Robber Invariant (Include vs Exclude)", "Coin Change Fewest Coins", "Space Optimization from O(n) to O(1)"],
    commonMistakes: ["Overwriting previous state values before they are consumed in space-optimized variables"],
  },
  {
    id: "topic-2d-dp",
    slug: "2d-dp",
    title: "2D Dynamic Programming",
    category: "Dynamic Programming",
    description: "Work with 2D state matrices, grid paths, string edit distance, and multiple independent parameter transitions.",
    difficulty: 4,
    estimatedMinutes: 90,
    prerequisites: ["1d-dp"],
    masteryCriteria: "Formulate 2D state transitions dp[i][j] for grid traversals and string alignments, optimizing to 1D row buffer when applicable.",
    summary: "DP where states require two coordinate parameters, such as grid locations (row, col) or string indices (i, j).",
    keyConcepts: ["2D Grid Unique Paths", "String Edit Distance (Levenshtein)", "State Transition Matrix", "Row-by-Row Rolling Buffer Space Optimization"],
    commonMistakes: ["Boundary condition errors on row 0 and column 0", "Incorrect indexing when matching characters at (i-1, j-1)"],
  },
  {
    id: "topic-knapsack",
    slug: "knapsack",
    title: "Knapsack Problems",
    category: "Dynamic Programming",
    description: "Master 0/1 Knapsack, Unbounded Knapsack, and Partition Equal Subset Sum state definitions and space optimizations.",
    difficulty: 4,
    estimatedMinutes: 85,
    prerequisites: ["2d-dp"],
    masteryCriteria: "Derive 0/1 Knapsack DP formulation and optimize 2D table into a 1D reverse-iterated array in O(n * W) time.",
    summary: "Classic optimization of choosing items with weights and values to maximize total value within a weight limit constraint.",
    keyConcepts: ["0/1 Knapsack (Take or Skip)", "Unbounded Knapsack (Reuse Allowed)", "Subset Sum Problem", "1D Space Optimization with Reverse Loop"],
    commonMistakes: ["Iterating forward in 1D 0/1 knapsack, accidentally turning it into unbounded knapsack by reusing items in the same pass"],
  },
  {
    id: "topic-subsequence-dp",
    slug: "subsequence-dp",
    title: "Subsequence DP",
    category: "Dynamic Programming",
    description: "Solve Longest Increasing Subsequence (LIS), Longest Common Subsequence (LCS), and Palindromic Subsequences.",
    difficulty: 4,
    estimatedMinutes: 85,
    prerequisites: ["2d-dp"],
    masteryCriteria: "Formulate LCS in O(m * n) and LIS in O(n²) DP and optimize LIS to O(n log n) using patience sorting binary search.",
    summary: "Analyzing non-contiguous subsequences across one or two sequences using optimal substructure.",
    keyConcepts: ["Longest Common Subsequence (LCS)", "Longest Increasing Subsequence (LIS)", "O(n log n) Patience Sorting with Binary Search", "Longest Palindromic Subsequence"],
    commonMistakes: ["Confusing contiguous substrings with non-contiguous subsequences"],
  },
  {
    id: "topic-grid-dp",
    slug: "grid-dp",
    title: "Grid DP",
    category: "Dynamic Programming",
    description: "Calculate optimal paths, minimum path sum, and obstacle navigations on 2D matrices.",
    difficulty: 3,
    estimatedMinutes: 65,
    prerequisites: ["2d-dp"],
    masteryCriteria: "Compute minimum path sums and count paths with obstacles in O(R * C) time and O(C) auxiliary space.",
    summary: "Finding shortest paths, minimum costs, or number of ways to traverse from top-left to bottom-right of a 2D grid.",
    keyConcepts: ["Unique Paths I & II", "Minimum Path Sum", "Dungeon Game State Formulation", "Obstacle Handling"],
    commonMistakes: ["Failing to initialize starting cell or first row/column correctly when obstacles are present"],
  },
  {
    id: "topic-state-transition",
    slug: "state-transition",
    title: "State Transition & State Machines",
    category: "Dynamic Programming",
    description: "Model multi-state problems such as Best Time to Buy and Sell Stock with cooldowns/transaction fees as finite state machines.",
    difficulty: 4,
    estimatedMinutes: 80,
    prerequisites: ["1d-dp"],
    masteryCriteria: "Formulate state machines with distinct hold, sold, rest states and compute optimal transitions in O(n).",
    summary: "Using finite state machine representations inside DP to manage complex transition rules like trading cooldowns.",
    keyConcepts: ["Finite State Machine (FSM) in DP", "Stock Trading with Cooldown & Fees", "State Transition Graph", "Mutually Exclusive Status States"],
    commonMistakes: ["Combining distinct lifecycle states into a single ambiguous DP variable"],
  },

  // ==================== BACKTRACKING ====================
  {
    id: "topic-backtracking-fundamentals",
    slug: "backtracking-fundamentals",
    title: "Backtracking Fundamentals",
    category: "Backtracking",
    description: "Explore exhaustive search trees, state choices, recursive constraints, and state restoration (undoing choices).",
    difficulty: 3,
    estimatedMinutes: 70,
    prerequisites: ["recursion"],
    masteryCriteria: "Structure backtracking templates: choose, explore (recurse), un-choose (backtrack) with precise base conditions.",
    summary: "Backtracking builds candidate solutions incrementally and abandons (prunes) a candidate as soon as it is determined invalid.",
    keyConcepts: ["Decision Tree Exploration", "State Choice and Restoration (Undo)", "Pruning Invalid Search Branches", "Base Case Termination"],
    commonMistakes: ["Forgetting to undo the state mutation after returning from recursive call", "Modifying shared array references without cloning before adding to results"],
  },
  {
    id: "topic-subsets",
    slug: "subsets",
    title: "Subsets (Power Set)",
    category: "Backtracking",
    description: "Generate all 2ⁿ subsets of a collection using recursive include/exclude decisions or bitmasking.",
    difficulty: 3,
    estimatedMinutes: 65,
    prerequisites: ["backtracking-fundamentals"],
    masteryCriteria: "Generate power set for distinct and duplicate elements in O(n * 2ⁿ) time with duplicate pruning.",
    summary: "Systematically generating all possible subsets of an array by making include/exclude decisions on each element.",
    keyConcepts: ["Include / Exclude Choice Tree", "Bitmask Representation of Subsets", "Duplicate Pruning (Sort First + Skip nums[i] === nums[i-1])", "O(n * 2ⁿ) Complexity"],
    commonMistakes: ["Pushing mutated candidate array into results without shallow copy [...current]", "Failing to sort array before pruning duplicate subsets"],
  },
  {
    id: "topic-permutations",
    slug: "permutations",
    title: "Permutations",
    category: "Backtracking",
    description: "Generate all n! orderings of elements using visited boolean arrays or in-place element swapping.",
    difficulty: 3,
    estimatedMinutes: 70,
    prerequisites: ["backtracking-fundamentals"],
    masteryCriteria: "Generate all permutations for unique and duplicate element collections in O(n * n!) time.",
    summary: "Generating all unique sequential arrangements of items where order matters.",
    keyConcepts: ["O(n!) Permutation Tree", "Visited Boolean Array Tracking", "In-Place Swap Permutation", "Duplicate Handling with Sorted Input"],
    commonMistakes: ["Confusing subset combinations (order does not matter) with permutations (order matters)"],
  },
  {
    id: "topic-combinations",
    slug: "combinations",
    title: "Combinations & Combination Sum",
    category: "Backtracking",
    description: "Find combinations of size k or combinations summing to a target value, allowing single-use or unlimited element reuse.",
    difficulty: 3,
    estimatedMinutes: 70,
    prerequisites: ["backtracking-fundamentals", "subsets"],
    masteryCriteria: "Implement combination sum variations with pruning when candidate sum exceeds target.",
    summary: "Selecting k items or target-sum groupings from a candidate set without regard to order.",
    keyConcepts: ["Start Index Management", "Combination Sum with Unlimited vs Single Reuse", "Early Pruning on Target Overflow"],
    commonMistakes: ["Resetting search index to 0 instead of start index, generating duplicate permutations instead of combinations"],
  },
  {
    id: "topic-constraint-problems",
    slug: "constraint-problems",
    title: "Constraint Satisfaction (N-Queens & Sudoku)",
    category: "Backtracking",
    description: "Solve heavy constraint satisfaction problems like N-Queens and Sudoku Solver with aggressive pruning.",
    difficulty: 4,
    estimatedMinutes: 90,
    prerequisites: ["backtracking-fundamentals", "hash-sets"],
    masteryCriteria: "Model board constraints with lookup sets for rows, cols, diagonals and implement recursive solvers.",
    summary: "Complex puzzle solving by validating row, column, and diagonal constraints before recursing.",
    keyConcepts: ["N-Queens Diagonal Mathematical Invariants (row - col, row + col)", "Sudoku 3x3 Box Indexing", "Aggressive Constraint Propagation", "Early True-Return Backtracking"],
    commonMistakes: ["Iterating whole board on every step instead of placing one queen per row"],
  },

  // ==================== ADVANCED ====================
  {
    id: "topic-bit-manipulation",
    slug: "bit-manipulation",
    title: "Bit Manipulation",
    category: "Advanced",
    description: "Master bitwise operators (AND, OR, XOR, NOT, shifts), bitmasks, two's complement, and Brian Kernighan's bit counting.",
    difficulty: 3,
    estimatedMinutes: 60,
    prerequisites: ["programming-fundamentals"],
    masteryCriteria: "Use XOR for single number discovery, bitmasks for compact set representations, and bit twiddling tricks.",
    summary: "Direct binary bit manipulation enables blazing fast constant-time operations and compact 32/64-state bitmasks.",
    keyConcepts: ["Bitwise Operators (&, |, ^, ~, <<, >>)", "XOR Properties (x ^ x = 0, x ^ 0 = x)", "Brian Kernighan's Algorithm (n & (n - 1))", "Bitmask State Representation"],
    commonMistakes: ["Operator precedence bugs (bitwise operators have lower precedence than arithmetic/comparison operators)"],
  },
  {
    id: "topic-segment-trees",
    slug: "segment-trees",
    title: "Segment Trees",
    category: "Advanced",
    description: "Build binary trees over array segments to perform range queries (sum, min, max) and point updates in O(log n) time.",
    difficulty: 5,
    estimatedMinutes: 90,
    prerequisites: ["binary-trees", "complexity-analysis"],
    masteryCriteria: "Build segment tree in O(n) and execute range queries and updates with lazy propagation in O(log n).",
    summary: "Tree data structure for storing information about intervals or segments, allowing fast range queries and interval updates.",
    keyConcepts: ["Segment Tree Array Representation", "O(n) Tree Construction", "O(log n) Range Query & Point Update", "Lazy Propagation for Range Updates"],
    commonMistakes: ["Incorrect segment boundary overlap conditions (partial vs total vs no overlap)"],
  },
  {
    id: "topic-fenwick-trees",
    slug: "fenwick-trees",
    title: "Fenwick Trees (Binary Indexed Trees)",
    category: "Advanced",
    description: "Maintain prefix sums and point updates with minimal code and O(log n) performance using lowbit index math.",
    difficulty: 4,
    estimatedMinutes: 75,
    prerequisites: ["bit-manipulation", "prefix-sum"],
    masteryCriteria: "Implement BIT using lowbit (i & -i) math for O(log n) prefix sums and point updates.",
    summary: "Compact data structure that supports prefix sum calculations and element updates in logarithmic time with O(n) space.",
    keyConcepts: ["Lowbit Operation (i & -i)", "1-based Indexing", "O(log n) Point Update & Prefix Sum", "Minimal Memory Footprint"],
    commonMistakes: ["Using 0-based indexing without index offset causing infinite loops in lowbit math"],
  },
  {
    id: "topic-advanced-graph-algorithms",
    slug: "advanced-graph-algorithms",
    title: "Advanced Graph Algorithms",
    category: "Advanced",
    description: "Explore Tarjan's Strongly Connected Components, Bridges, Articulation Points, Bellman-Ford, and Floyd-Warshall.",
    difficulty: 5,
    estimatedMinutes: 95,
    prerequisites: ["dfs", "shortest-path", "dijkstra"],
    masteryCriteria: "Find bridges/articulation points with discovery/low times in O(V + E) and solve all-pairs shortest paths in O(V³).",
    summary: "High-level graph algorithms solving strong connectivity, network reliability, and all-pairs shortest path queries.",
    keyConcepts: ["Tarjan's & Kosaraju's SCC Algorithms", "Bridges & Articulation Points (Low-link Values)", "Bellman-Ford (Negative Cycles)", "Floyd-Warshall All-Pairs O(V³)"],
    commonMistakes: ["Failing to handle parent edges correctly in undirected bridge detection"],
  },
  {
    id: "topic-advanced-dp",
    slug: "advanced-dp",
    title: "Advanced Dynamic Programming",
    category: "Advanced",
    description: "Master DP with bitmasks, digit DP, tree DP, and convex hull trick optimizations.",
    difficulty: 5,
    estimatedMinutes: 100,
    prerequisites: ["knapsack", "subsequence-dp", "bit-manipulation", "tree-traversal"],
    masteryCriteria: "Solve TSP with bitmask DP in O(n² * 2ⁿ) and compute optimal subtree properties using Tree DP in O(V).",
    summary: "Advanced dynamic programming paradigms combining exponential state compression, combinatorial digit counting, and tree post-order traversals.",
    keyConcepts: ["Bitmask DP (Traveling Salesperson)", "Tree DP (Subtree Maximization)", "Digit DP for Range Counts", "Convex Hull Trick Optimization"],
    commonMistakes: ["Exceeding memory limit on bitmask dimensions when number of items exceeds 20"],
  },
];
