# 🗳️ Proof of Vote (PoV)

**Proof of Vote (PoV)** is a blockchain-based voting system built with Java and Spring Boot, designed to ensure electoral transparency, immutability, and trust through decentralized vote recording. Every vote is securely stored on a custom blockchain, enabling real-time result verification and public auditability.

---

## 🚀 Features

- 🔐 Secure one-vote-per-user enforcement
- ⛓️ Blockchain-based vote storage with SHA-256 hashing
- 👤 Role-based access for voters and administrators
- 🗳️ Real-time election result computation from immutable data
- 📜 Public hash for vote verification
- 🖥️ Web-based UI for voting and result tracking

---

## 👥 Users and Their Roles

### 🔸 Anonymous Users
- View upcoming or ongoing elections
- Register to become a verified voter

### 🔸 Registered Voters
- Log in securely
- Cast one vote per election
- View results after the election ends
- Optionally verify their vote via public hash on blockchain

### 🔸 Election Administrators
- Create and configure elections
- Add/edit/remove candidates
- Set voting windows
- Monitor voter activity and system status
- Finalize and publish election results

---

## 🧾 Use Cases

### 1. Registration
- **Actors**: Anonymous User, System  
- **Description**: User submits ID details → System verifies and creates a voter account

### 2. Casting a Vote
- **Actors**: Registered Voter, System  
- **Description**: Voter logs in → selects candidate → vote becomes a new block on the chain (immutable)

### 3. Creating an Election
- **Actors**: Administrator, System  
- **Description**: Admin defines election metadata, candidates, and voting time window

### 4. Viewing Results
- **Actors**: Voter or Admin, System  
- **Description**: Post-election, system tallies votes from blockchain and displays the result

### 5. Managing Candidates
- **Actors**: Admin, System  
- **Description**: Admin configures candidate data (name, party, description) before election starts

### 6. Vote Verification
- **Actors**: Voter, System  
- **Description**: Voter receives a unique vote hash → can later verify existence in the blockchain

---

## 🧱 Tech Stack

| Component        | Technology             |
|------------------|------------------------|
| Backend API      | Java + Spring Boot     |
| Blockchain Logic | Custom Java Classes    |
| Frontend UI      | Thymeleaf (or React)   |
| Database         | H2 / MySQL             |
| Build Tool       | Maven or Gradle        |
| Version Control  | GitHub                 |
| IDE              | IntelliJ / VS Code     |

---

## 📂 Project Structure

```
PoV-voting-system/
│
├── src/main/java/com/voting
│   ├── controller/
│   ├── model/ (User, Vote, Election, Block)
│   ├── service/
│   ├── repository/
│   └── Blockchain.java
│
├── src/main/resources/templates/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── vote.html
│   ├── results.html
│
├── src/main/resources/static/ (CSS, JS, Bootstrap)
├── application.properties
└── pom.xml

```


---

## 🛠️ How It Works

1. **Registration/Login**: Users register, then log in with credentials
2. **Voting**: Authenticated voters select a candidate and submit vote → converted into a block
3. **Blockchain Logic**:
   - Each vote block contains voter ID (anonymized), candidate ID, timestamp, and previous block hash
   - Hashing ensures tamper-proof data (SHA-256)
   - Optional: Proof-of-work for added security
4. **Result Calculation**: Admin or system tallies blockchain votes for each candidate
5. **Verification**: Public vote hashes allow voters to confirm their vote's presence on the chain

---

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/proof-of-vote.git
cd proof-of-vote

# Build with Maven
mvn clean install

# Run the app
mvn spring-boot:run
```
## 👨‍💻 Authors
[Salsabila Zaman] ,[Mohammed Yasin] 

## 📃 License

This project is licensed under the MIT License.

    “Trust, but verify — with blockchain, you can do both.”