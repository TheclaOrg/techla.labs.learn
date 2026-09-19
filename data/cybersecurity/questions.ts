import { DiagnosticQuestion } from "@/types/learning";

export const cyberDiagnosticQuestions: DiagnosticQuestion[] = [
  // 1. Networking — TCP/IP
  {
    id: "cyber-q-001",
    domain: "cybersecurity",
    topicSlug: "transport-layer-protocols",
    category: "Networking",
    difficulty: "beginner",
    type: "concept",
    question: "Which protocol is primarily responsible for reliably delivering data between two hosts?",
    options: ["UDP", "TCP", "DNS", "ARP"],
    correctAnswer: 1, // B - TCP
    explanation: "TCP (Transmission Control Protocol) is a connection-oriented transport layer protocol that provides reliable, ordered, and error-checked delivery of a stream of bytes between hosts.",
  },

  // 2. Networking — DNS
  {
    id: "cyber-q-002",
    domain: "cybersecurity",
    topicSlug: "core-network-protocols",
    category: "Networking",
    difficulty: "beginner",
    type: "concept",
    question: "What is the primary purpose of DNS?",
    options: [
      "Encrypt network traffic",
      "Translate domain names into IP addresses",
      "Assign MAC addresses",
      "Block malicious traffic",
    ],
    correctAnswer: 1, // B
    explanation: "DNS (Domain Name System) functions as the internet's phonebook, translating human-friendly domain names (e.g. techla.labs) into machine-readable numerical IP addresses.",
  },

  // 3. Networking — Ports
  {
    id: "cyber-q-003",
    domain: "cybersecurity",
    topicSlug: "transport-layer-protocols",
    category: "Networking",
    difficulty: "beginner",
    type: "concept",
    question: "Which port is normally associated with HTTPS?",
    options: ["21", "22", "80", "443"],
    correctAnswer: 3, // D - 443
    explanation: "HTTPS (HTTP over TLS/SSL) uses TCP port 443 by default for encrypted web communications, whereas unencrypted HTTP uses port 80, SSH uses port 22, and FTP uses port 21.",
  },

  // 4. Networking — IP
  {
    id: "cyber-q-004",
    domain: "cybersecurity",
    topicSlug: "ip-addressing-and-subnetting",
    category: "Networking",
    difficulty: "beginner",
    type: "concept",
    question: "Which of the following is a private IPv4 address?",
    options: ["8.8.8.8", "172.16.10.5", "1.1.1.1", "45.33.32.156"],
    correctAnswer: 1, // B - 172.16.10.5
    explanation: "Under RFC 1918, private IPv4 address ranges are 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 - 172.31.255.255), and 192.168.0.0/16. 8.8.8.8 and 1.1.1.1 are public DNS servers.",
  },

  // 5. Linux
  {
    id: "cyber-q-005",
    domain: "cybersecurity",
    topicSlug: "linux-permissions-and-users",
    category: "Linux",
    difficulty: "beginner",
    type: "concept",
    question: "What does the Linux command `chmod` primarily do?",
    options: [
      "Change file ownership",
      "Change file permissions",
      "Terminate a process",
      "Display network connections",
    ],
    correctAnswer: 1, // B
    explanation: "`chmod` (change mode) modifies read (r), write (w), and execute (x) access permissions for users, groups, and others on Linux files and directories.",
  },

  // 6. Linux Processes
  {
    id: "cyber-q-006",
    domain: "cybersecurity",
    topicSlug: "processes-and-services",
    category: "Linux",
    difficulty: "beginner",
    type: "concept",
    question: "Which command can be used to view running processes on a Linux system?",
    options: ["ps", "mkdir", "touch", "grep"],
    correctAnswer: 0, // A - ps
    explanation: "`ps` (process status) displays active processes and their process IDs (PIDs), CPU, and memory utilization in the terminal.",
  },

  // 7. Windows
  {
    id: "cyber-q-007",
    domain: "cybersecurity",
    topicSlug: "active-directory-fundamentals",
    category: "Windows",
    difficulty: "intermediate",
    type: "concept",
    question: "Which Windows technology is commonly used for centralized management of users, computers, and authentication in an enterprise?",
    options: ["Active Directory", "NTFS", "IIS", "BitLocker"],
    correctAnswer: 0, // A - Active Directory
    explanation: "Active Directory (AD) is Microsoft's directory service providing centralized domain identity management, Kerberos authentication, and Group Policy management.",
  },

  // 8. CIA Triad
  {
    id: "cyber-q-008",
    domain: "cybersecurity",
    topicSlug: "cia-triad-and-security-principles",
    category: "Security Fundamentals",
    difficulty: "beginner",
    type: "concept",
    question: "What does the CIA triad represent in cybersecurity?",
    options: [
      "Confidentiality, Integrity, Availability",
      "Control, Inspection, Authentication",
      "Confidentiality, Inspection, Authorization",
      "Cryptography, Integrity, Authentication",
    ],
    correctAnswer: 0, // A
    explanation: "The CIA Triad stands for Confidentiality (privacy), Integrity (accuracy/trustworthiness of data), and Availability (accessibility by authorized users).",
  },

  // 9. Authentication
  {
    id: "cyber-q-009",
    domain: "cybersecurity",
    topicSlug: "authentication-and-access-control",
    category: "Security Fundamentals",
    difficulty: "beginner",
    type: "concept",
    question: "Which statement best describes authentication?",
    options: [
      "Determining what a user is allowed to access",
      "Verifying who a user is",
      "Encrypting a user's data",
      "Monitoring network traffic",
    ],
    correctAnswer: 1, // B
    explanation: "Authentication is the process of verifying a user's identity (e.g. passwords, certificates, biometric scans). Authorization is determining what permissions that verified identity has.",
  },

  // 10. Cryptography
  {
    id: "cyber-q-010",
    domain: "cybersecurity",
    topicSlug: "hashing-and-integrity",
    category: "Security Fundamentals",
    difficulty: "intermediate",
    type: "concept",
    question: "What is the primary purpose of hashing a password?",
    options: [
      "Make the password reversible",
      "Store a representation that is difficult to reverse into the original password",
      "Increase the password's length",
      "Send the password securely over HTTP",
    ],
    correctAnswer: 1, // B
    explanation: "Hashing produces an irreversible mathematical digest of the password, so that even if the database is breached, the attacker cannot trivially recover plaintext passwords.",
  },

  // 11. Encryption
  {
    id: "cyber-q-011",
    domain: "cybersecurity",
    topicSlug: "cryptography-and-encryption",
    category: "Security Fundamentals",
    difficulty: "intermediate",
    type: "concept",
    question: "What is the main difference between encryption and hashing?",
    options: [
      "Encryption is designed to be reversible with the appropriate key, while hashing is generally one-way",
      "Hashing always uses two keys",
      "Encryption cannot protect data",
      "There is no difference",
    ],
    correctAnswer: 0, // A
    explanation: "Encryption is a two-way cryptographic operation intended to be decrypted back into plaintext with a secret key, whereas hashing is a one-way irreversible digest function.",
  },

  // 12. Phishing
  {
    id: "cyber-q-012",
    domain: "cybersecurity",
    topicSlug: "cia-triad-and-security-principles",
    category: "Security Fundamentals",
    difficulty: "beginner",
    type: "problem_strategy",
    question: "Which scenario is the clearest example of phishing?",
    options: [
      "A server crashing because of excessive CPU usage",
      "An attacker sending a fake login email designed to steal credentials",
      "A developer accidentally deleting a database",
      "A firewall blocking an IP address",
    ],
    correctAnswer: 1, // B
    explanation: "Phishing is a social engineering attack where malicious actors impersonate legitimate entities (via email, SMS, or fake login portals) to trick victims into revealing sensitive credentials.",
  },

  // 13. Web Security — SQL Injection
  {
    id: "cyber-q-013",
    domain: "cybersecurity",
    topicSlug: "sql-injection",
    category: "Web Security",
    difficulty: "intermediate",
    type: "code",
    question: "What type of vulnerability occurs if user input is concatenated directly into this query without sanitization or parameterization?",
    codeSnippet: `SELECT * FROM users
WHERE username = '$username'
AND password = '$password';`,
    options: ["XSS", "SQL Injection", "CSRF", "DNS poisoning"],
    correctAnswer: 1, // B - SQL Injection
    explanation: "Direct string interpolation enables SQL Injection (SQLi), allowing attackers to inject characters like `' OR '1'='1` to alter query logic and bypass authentication.",
  },

  // 14. Web Security — XSS
  {
    id: "cyber-q-014",
    domain: "cybersecurity",
    topicSlug: "cross-site-scripting-xss",
    category: "Web Security",
    difficulty: "intermediate",
    type: "concept",
    question: "What is Cross-Site Scripting (XSS)?",
    options: [
      "An attack that injects malicious client-side scripts into web pages",
      "An attack against DNS servers",
      "A method of encrypting cookies",
      "A network scanning technique",
    ],
    correctAnswer: 0, // A
    explanation: "Cross-Site Scripting (XSS) allows attackers to inject malicious JavaScript into web applications viewed by other users, stealing session cookies or redirecting users.",
  },

  // 15. Web Security — Authentication
  {
    id: "cyber-q-015",
    domain: "cybersecurity",
    topicSlug: "authentication-and-access-control",
    category: "Web Security",
    difficulty: "beginner",
    type: "concept",
    question: "Why is multi-factor authentication (MFA) useful?",
    options: [
      "It makes passwords unnecessary in every situation",
      "It adds another authentication factor beyond just the password",
      "It encrypts all network traffic",
      "It prevents every type of cyberattack",
    ],
    correctAnswer: 1, // B
    explanation: "MFA requires two or more distinct verification categories (e.g. password + authenticator app token), so stolen passwords alone are insufficient for an attacker to gain access.",
  },

  // 16. Network Security
  {
    id: "cyber-q-016",
    domain: "cybersecurity",
    topicSlug: "firewalls-and-vpns",
    category: "Networking",
    difficulty: "beginner",
    type: "concept",
    question: "What is the primary purpose of a firewall?",
    options: [
      "Store passwords",
      "Filter and control network traffic according to defined rules",
      "Encrypt every file on a computer",
      "Automatically remove all malware",
    ],
    correctAnswer: 1, // B
    explanation: "A firewall establishes a barrier between trusted internal networks and untrusted external networks, inspecting packet headers and state to enforce allow/deny security rules.",
  },

  // 17. Security Tools
  {
    id: "cyber-q-017",
    domain: "cybersecurity",
    topicSlug: "nmap-and-network-recon",
    category: "Security Tools",
    difficulty: "intermediate",
    type: "concept",
    question: "What is Nmap primarily used for?",
    options: [
      "Video editing",
      "Network discovery and port scanning",
      "Password encryption",
      "Database management",
    ],
    correctAnswer: 1, // B
    explanation: "Nmap (Network Mapper) is a security utility for network discovery, scanning target hosts for open ports, running services, OS versions, and configuration vulnerabilities.",
  },

  // 18. Blue Team / SOC
  {
    id: "cyber-q-018",
    domain: "cybersecurity",
    topicSlug: "soc-fundamentals-and-siem",
    category: "Blue Team & SOC",
    difficulty: "intermediate",
    type: "problem_strategy",
    question: "A security analyst notices hundreds of failed login attempts against multiple accounts from the same IP address. What would this most likely indicate?",
    options: [
      "A successful software update",
      "A possible brute-force or password-spraying attack",
      "Normal DNS behavior",
      "A hardware failure",
    ],
    correctAnswer: 1, // B
    explanation: "Repeated failed authentications against various user accounts from a single IP is a classic indicator of automated brute-force or password-spraying credential attacks.",
  },

  // 19. Incident Response
  {
    id: "cyber-q-019",
    domain: "cybersecurity",
    topicSlug: "incident-response-lifecycle",
    category: "Blue Team & SOC",
    difficulty: "intermediate",
    type: "concept",
    question: "A company discovers that an attacker has compromised one of its servers. What should a security team generally do as part of incident response?",
    options: [
      "Immediately delete all logs",
      "Ignore the incident unless data was publicly leaked",
      "Investigate, contain the incident, preserve evidence, and remediate the cause",
      "Turn off every company computer permanently",
    ],
    correctAnswer: 2, // C
    explanation: "Standard incident response involves scoping the compromise, isolating/containing affected systems, preserving forensic evidence, removing the attacker, and patching the root vulnerability.",
  },

  // 20. Cloud Security
  {
    id: "cyber-q-020",
    domain: "cybersecurity",
    topicSlug: "cloud-security-and-iam",
    category: "Cloud Security",
    difficulty: "intermediate",
    type: "concept",
    question: "Which of the following is a common cloud-security risk?",
    options: [
      "Misconfigured storage exposing sensitive data publicly",
      "Having an IP address",
      "Using HTTPS",
      "Using MFA",
    ],
    correctAnswer: 0, // A
    explanation: "Cloud storage misconfigurations (such as public AWS S3 buckets or Azure Blobs) frequently lead to catastrophic data leaks due to permissive access control policies.",
  },
];
