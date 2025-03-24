CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL
);

CREATE TABLE Admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    authority VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Fines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    fine_type VARCHAR(255) NOT NULL,
    fine_amount DECIMAL(10, 2) NOT NULL,
    assigned_by INT,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (assigned_by) REFERENCES Admins(id)
);

CREATE TABLE Documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document_name VARCHAR(255) NOT NULL,
    description TEXT,
    available_for VARCHAR(255) NOT NULL
);