# Algae Collection API Documentation

## Base URL
```
http://localhost:8000/api/
```

## Authentication
The API uses JWT (JSON Web Token) authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_access_token>
```

## Authentication Endpoints

### 1. User Registration
**POST** `/api/auth/register/`

Register a new user account.

**Request Body:**
```json
{
    "username": "researcher1",
    "email": "researcher1@example.com",
    "password": "securepassword123",
    "password_confirm": "securepassword123",
    "first_name": "John",
    "last_name": "Doe"
}
```

**Response:**
```json
{
    "message": "User created successfully",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "user": {
        "id": 1,
        "username": "researcher1",
        "email": "researcher1@example.com",
        "first_name": "John",
        "last_name": "Doe"
    }
}
```

### 2. User Login
**POST** `/api/auth/login/`

Authenticate user and get access tokens.

**Request Body:**
```json
{
    "username": "researcher1",
    "password": "securepassword123"
}
```

### 3. User Logout
**POST** `/api/auth/logout/`

Logout user and blacklist refresh token.

**Request Body:**
```json
{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### 4. Password Reset Request
**POST** `/api/auth/password-reset/`

Request password reset link.

**Request Body:**
```json
{
    "email": "researcher1@example.com"
}
```

### 5. Password Reset Confirm
**POST** `/api/auth/password-reset-confirm/`

Confirm password reset with token.

**Request Body:**
```json
{
    "token": "reset_token_here",
    "new_password": "newpassword123",
    "new_password_confirm": "newpassword123"
}
```

## User Management Endpoints

### 1. Get User Profile
**GET** `/api/user/profile/`

Get current user's profile information.

**Response:**
```json
{
    "id": 1,
    "username": "researcher1",
    "email": "researcher1@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "date_joined": "2024-01-15T10:30:00Z",
    "last_login": "2024-01-20T14:45:00Z"
}
```

### 2. Update User Profile
**PUT** `/api/user/update-profile/`

Update user profile information.

**Request Body:**
```json
{
    "email": "newemail@example.com",
    "first_name": "Jane",
    "last_name": "Smith"
}
```

### 3. Change Password
**POST** `/api/user/change-password/`

Change user password.

**Request Body:**
```json
{
    "old_password": "oldpassword123",
    "new_password": "newpassword123",
    "new_password_confirm": "newpassword123"
}
```

### 4. User Statistics
**GET** `/api/user/statistics/`

Get user's collection statistics and recent activity.

**Response:**
```json
{
    "total_collections": 25,
    "unique_locations": 5,
    "unique_classes": 8,
    "unique_families": 12,
    "recent_collections": [...],
    "class_distribution": {
        "Rhodophyceae": 15,
        "Phaeophyceae": 8,
        "Ulvophyceae": 2
    }
}
```

## Data Management Endpoints

### 1. Locations
**GET** `/api/locations/` - List all locations
**POST** `/api/locations/` - Create new location (requires authentication)
**GET** `/api/locations/{id}/` - Get specific location
**PUT** `/api/locations/{id}/` - Update location (requires authentication)
**DELETE** `/api/locations/{id}/` - Delete location (requires authentication)

### 2. Algae
**GET** `/api/algae/` - List all algae (with filtering and search)
**POST** `/api/algae/` - Create new algae record (requires authentication)
**GET** `/api/algae/{id}/` - Get specific algae record
**PUT** `/api/algae/{id}/` - Update algae record (requires authentication)
**DELETE** `/api/algae/{id}/` - Delete algae record (requires authentication)

#### Filtering Options:
- `?class_name=Rhodophyceae` - Filter by class
- `?order=Nemaliales` - Filter by order
- `?family=Sciniaceae` - Filter by family
- `?location=1` - Filter by location ID
- `?search=Scinaia` - Search in scientific name, common name, and description

### 3. Bulk Upload
**POST** `/api/algae/bulk-upload`

Upload multiple algae records from CSV file.

**Request (multipart/form-data):**
- `file`: CSV file
- `collector_name`: Name of the collector

## Error Responses

All endpoints return appropriate HTTP status codes and error messages:

```json
{
    "error": "Error message here"
}
```

or for validation errors:

```json
{
    "field_name": ["Error message for this field"]
}
```

## Pagination

List endpoints support pagination:
```json
{
    "count": 100,
    "next": "http://localhost:8000/api/algae/?page=2",
    "previous": null,
    "results": [...]
}
```