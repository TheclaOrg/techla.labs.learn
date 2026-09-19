-- ==============================================================================
-- TECHLA.LABS.LEARN - SEED DATA
-- ==============================================================================

-- 1. Insert Learning Domains
insert into public.learning_domains (id, slug, name, description, status) values
  ('d0000000-0000-0000-0000-000000000001', 'dsa', 'Data Structures & Algorithms', 'Build problem-solving skills from core computational fundamentals to advanced algorithmic graph & dynamic programming patterns.', 'available'),
  ('d0000000-0000-0000-0000-000000000002', 'frontend', 'Frontend Engineering', 'Master modern web interfaces, React, Next.js, state machines, and high-performance frontend architecture.', 'coming_soon'),
  ('d0000000-0000-0000-0000-000000000003', 'backend', 'Backend Engineering', 'Build resilient APIs, distributed services, message queues, and scalable backend architectures.', 'coming_soon'),
  ('d0000000-0000-0000-0000-000000000004', 'databases', 'Databases & Storage', 'Understand relational systems, SQL, B-tree indexes, ACID transactions, and modern distributed databases.', 'coming_soon'),
  ('d0000000-0000-0000-0000-000000000005', 'fullstack', 'Full-Stack Engineering', 'Bridge frontend, backend, databases, cloud infrastructure, and end-to-end production systems.', 'coming_soon'),
  ('d0000000-0000-0000-0000-000000000006', 'security', 'Web Security & Auth', 'Master application security, OAuth2, JWTs, cryptography, session management, and secure architecture.', 'coming_soon')
on conflict (slug) do nothing;

-- 2. Insert Core Topics
insert into public.topics (id, domain_id, slug, title, category, description, difficulty, estimated_minutes) values
  ('t0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'programming-fundamentals', 'Programming Fundamentals', 'Foundations', 'Variables, control flow, loops, functions, memory references, and basic algorithmic thinking.', 1, 45),
  ('t0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000001', 'big-o-notation', 'Big O Notation', 'Foundations', 'Asymptotic upper bounds, growth rates, time and space complexity approximations.', 1, 60),
  ('t0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000001', 'complexity-analysis', 'Complexity Analysis', 'Foundations', 'Analysis of iterative loops, recursive trees, and amortized array expansions.', 2, 60),
  ('t0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000001', 'recursion', 'Recursion', 'Foundations', 'Functions solving problems by reducing to self-similar sub-problems with base cases.', 2, 75),
  ('t0000000-0000-0000-0000-000000000005', 'd0000000-0000-0000-0000-000000000001', 'arrays', 'Arrays', 'Arrays & Strings', 'Contiguous memory allocation, random index access, and element shifting overheads.', 1, 45),
  ('t0000000-0000-0000-0000-000000000006', 'd0000000-0000-0000-0000-000000000001', 'dynamic-arrays', 'Dynamic Arrays', 'Arrays & Strings', 'Capacity doubling, memory reallocation, and amortized O(1) append operations.', 2, 50),
  ('t0000000-0000-0000-0000-000000000007', 'd0000000-0000-0000-0000-000000000001', 'strings', 'Strings', 'Arrays & Strings', 'Character encodings, string immutability, builder buffers, and transformations.', 2, 50),
  ('t0000000-0000-0000-0000-000000000008', 'd0000000-0000-0000-0000-000000000001', 'two-pointers', 'Two Pointers', 'Arrays & Strings', 'Search and partitioning from O(n²) to O(n) using opposing or fast/slow pointer pairs.', 2, 70),
  ('t0000000-0000-0000-0000-000000000009', 'd0000000-0000-0000-0000-000000000001', 'sliding-window', 'Sliding Window', 'Arrays & Strings', 'Maintain dynamic/fixed contiguous range to calculate running aggregates in O(n).', 3, 80),
  ('t0000000-0000-0000-0000-000000000010', 'd0000000-0000-0000-0000-000000000001', 'prefix-sum', 'Prefix Sum', 'Arrays & Strings', 'Precomputed running totals for O(1) range sums and subarray targets.', 2, 60),
  ('t0000000-0000-0000-0000-000000000011', 'd0000000-0000-0000-0000-000000000001', 'singly-linked-lists', 'Singly Linked Lists', 'Linked Lists', 'Node-pointer structures, dynamic memory dispersion, and sequence management.', 2, 60),
  ('t0000000-0000-0000-0000-000000000012', 'd0000000-0000-0000-0000-000000000001', 'doubly-linked-lists', 'Doubly Linked Lists', 'Linked Lists', 'Bidirectional node references supporting O(1) arbitrary node deletion and LRU cache.', 2, 60),
  ('t0000000-0000-0000-0000-000000000013', 'd0000000-0000-0000-0000-000000000001', 'fast-and-slow-pointers', 'Fast & Slow Pointers', 'Linked Lists', 'Cycle detection and middle node finding via Floyd Tortoise and Hare algorithm.', 3, 65),
  ('t0000000-0000-0000-0000-000000000014', 'd0000000-0000-0000-0000-000000000001', 'stack', 'Stack', 'Stacks & Queues', 'Last-In First-Out discipline, call stack emulation, and bracket balancing.', 1, 45),
  ('t0000000-0000-0000-0000-000000000015', 'd0000000-0000-0000-0000-000000000001', 'queue', 'Queue', 'Stacks & Queues', 'First-In First-Out processing, circular buffers, and BFS queues.', 2, 50),
  ('t0000000-0000-0000-0000-000000000016', 'd0000000-0000-0000-0000-000000000001', 'monotonic-stack', 'Monotonic Stack', 'Stacks & Queues', 'Next Greater Element and histogram rectangle patterns in linear time.', 3, 75),
  ('t0000000-0000-0000-0000-000000000017', 'd0000000-0000-0000-0000-000000000001', 'hash-tables', 'Hash Tables', 'Hashing', 'Hash functions, bucket arrays, collision resolution, and O(1) lookups.', 2, 60),
  ('t0000000-0000-0000-0000-000000000018', 'd0000000-0000-0000-0000-000000000001', 'hash-sets', 'Hash Sets', 'Hashing', 'Unique element collections for O(1) membership testing and deduplication.', 1, 40),
  ('t0000000-0000-0000-0000-000000000019', 'd0000000-0000-0000-0000-000000000001', 'frequency-counting', 'Frequency Counting', 'Hashing', 'Count character and element occurrences with hash maps or frequency arrays.', 1, 45),
  ('t0000000-0000-0000-0000-000000000020', 'd0000000-0000-0000-0000-000000000001', 'binary-search', 'Binary Search', 'Searching', 'Divide search intervals in half on sorted arrays in O(log n) time.', 2, 70),
  ('t0000000-0000-0000-0000-000000000021', 'd0000000-0000-0000-0000-000000000001', 'binary-search-variations', 'Binary Search Variations', 'Searching', 'Rotated sorted arrays and binary search on monotonic answer spaces.', 3, 80),
  ('t0000000-0000-0000-0000-000000000022', 'd0000000-0000-0000-0000-000000000001', 'binary-trees', 'Binary Trees', 'Trees', 'Hierarchical tree node structures, depth, height, and balanced invariants.', 2, 55),
  ('t0000000-0000-0000-0000-000000000023', 'd0000000-0000-0000-0000-000000000001', 'tree-traversal', 'Tree Traversal', 'Trees', 'Preorder, Inorder, Postorder, and Level-Order BFS traversals.', 2, 70),
  ('t0000000-0000-0000-0000-000000000024', 'd0000000-0000-0000-0000-000000000001', 'binary-search-tree', 'Binary Search Tree (BST)', 'Trees', 'BST ordering invariant (left < root < right), search, insertion, and LCA.', 2, 75),
  ('t0000000-0000-0000-0000-000000000025', 'd0000000-0000-0000-0000-000000000001', 'heaps', 'Heaps', 'Trees', 'Binary heaps represented as arrays, sift-up/sift-down and O(log n) extract.', 2, 65),
  ('t0000000-0000-0000-0000-000000000026', 'd0000000-0000-0000-0000-000000000001', 'priority-queues', 'Priority Queues', 'Trees', 'Top-K frequent elements, merge K sorted lists, and running median.', 3, 70),
  ('t0000000-0000-0000-0000-000000000027', 'd0000000-0000-0000-0000-000000000001', 'tries', 'Tries (Prefix Trees)', 'Trees', 'O(L) string search, autocomplete, and prefix matching.', 3, 75),
  ('t0000000-0000-0000-0000-000000000028', 'd0000000-0000-0000-0000-000000000001', 'graph-representation', 'Graph Representation', 'Graphs', 'Adjacency lists, matrices, directed/undirected, and weighted graphs.', 2, 50),
  ('t0000000-0000-0000-0000-000000000029', 'd0000000-0000-0000-0000-000000000001', 'bfs', 'Breadth-First Search (BFS)', 'Graphs', 'Layer-by-layer graph exploration and unweighted shortest paths.', 2, 70),
  ('t0000000-0000-0000-0000-000000000030', 'd0000000-0000-0000-0000-000000000001', 'dfs', 'Depth-First Search (DFS)', 'Graphs', 'Deep recursive path exploration, cycle detection, and flood fill.', 2, 70),
  ('t0000000-0000-0000-0000-000000000031', 'd0000000-0000-0000-0000-000000000001', 'connected-components', 'Connected Components', 'Graphs', 'Islands counting and grid matrix subgraphs in O(R * C).', 2, 60),
  ('t0000000-0000-0000-0000-000000000032', 'd0000000-0000-0000-0000-000000000001', 'topological-sort', 'Topological Sort', 'Graphs', 'Linear ordering of DAG vertices using Kahn in-degree algorithm.', 3, 75),
  ('t0000000-0000-0000-0000-000000000033', 'd0000000-0000-0000-0000-000000000001', 'dijkstra', 'Dijkstras Algorithm', 'Graphs', 'Shortest paths in non-negative weighted graphs with min-priority queues.', 4, 80),
  ('t0000000-0000-0000-0000-000000000034', 'd0000000-0000-0000-0000-000000000001', 'union-find', 'Union Find (DSU)', 'Graphs', 'Disjoint set union with path compression in O(α(n)) amortized time.', 3, 75),
  ('t0000000-0000-0000-0000-000000000035', 'd0000000-0000-0000-0000-000000000001', 'greedy-fundamentals', 'Greedy Fundamentals', 'Greedy', 'Optimal substructure and greedy choice property for optimal scheduling.', 2, 60),
  ('t0000000-0000-0000-0000-000000000036', 'd0000000-0000-0000-0000-000000000001', 'interval-problems', 'Interval Problems', 'Greedy', 'Interval scheduling, merging, and meeting rooms via sorted endpoints.', 3, 70),
  ('t0000000-0000-0000-0000-000000000037', 'd0000000-0000-0000-0000-000000000001', 'dp-fundamentals', 'DP Fundamentals', 'Dynamic Programming', 'Memoization and tabulation for overlapping subproblems.', 3, 80),
  ('t0000000-0000-0000-0000-000000000038', 'd0000000-0000-0000-0000-000000000001', '1d-dp', '1D Dynamic Programming', 'Dynamic Programming', 'Linear state progressions including Climbing Stairs, House Robber, and Coin Change.', 3, 75),
  ('t0000000-0000-0000-0000-000000000039', 'd0000000-0000-0000-0000-000000000001', '2d-dp', '2D Dynamic Programming', 'Dynamic Programming', '2D state matrices, grid paths, and string edit distances.', 4, 90),
  ('t0000000-0000-0000-0000-000000000040', 'd0000000-0000-0000-0000-000000000001', 'knapsack', 'Knapsack Problems', 'Dynamic Programming', '0/1 Knapsack, unbounded knapsack, and subset sums.', 4, 85),
  ('t0000000-0000-0000-0000-000000000041', 'd0000000-0000-0000-0000-000000000001', 'subsequence-dp', 'Subsequence DP', 'Dynamic Programming', 'Longest Increasing Subsequence (LIS) and Longest Common Subsequence (LCS).', 4, 85),
  ('t0000000-0000-0000-0000-000000000042', 'd0000000-0000-0000-0000-000000000001', 'backtracking-fundamentals', 'Backtracking Fundamentals', 'Backtracking', 'Exhaustive decision trees, choice restoration, and branch pruning.', 3, 70),
  ('t0000000-0000-0000-0000-000000000043', 'd0000000-0000-0000-0000-000000000001', 'subsets', 'Subsets', 'Backtracking', 'Generate 2ⁿ subsets with include/exclude decision trees.', 3, 65),
  ('t0000000-0000-0000-0000-000000000044', 'd0000000-0000-0000-0000-000000000001', 'bit-manipulation', 'Bit Manipulation', 'Advanced', 'XOR properties, bitwise twiddling, and compact bitmask state sets.', 3, 60)
on conflict (slug) do nothing;
