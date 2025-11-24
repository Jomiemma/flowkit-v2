import csv

# Create a single CSV file with sample data that can be opened in Excel
# This will show actual rows and columns as they appear in the database

print("Creating FlowKit Admin Database Sample...")

# Users Table with Sample Data
with open('FlowKit_Admin_Database_Sample.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    
    # Sheet 1: USERS TABLE
    writer.writerow(['=== USERS COLLECTION (Sample Data) ==='])
    writer.writerow([])
    writer.writerow(['_id', 'firstName', 'lastName', 'email', 'password', 'staffId', 'department', 'role', 'isHOD', 'leaveBalance.total', 'leaveBalance.available', 'leaveBalance.used', 'isActive', 'createdAt', 'updatedAt'])
    writer.writerow(['507f1f77bcf86cd799439011', 'John', 'Doe', 'john.doe@company.com', '$2a$10$hashXYZ123...', 'STAFF-00001', 'IT', 'hod', 'true', '28', '20', '8', 'true', '2025-01-15T09:30:00Z', '2025-11-05T14:20:00Z'])
    writer.writerow(['507f1f77bcf86cd799439012', 'Jane', 'Smith', 'jane.smith@company.com', '$2a$10$hashABC456...', 'STAFF-00002', 'IT', 'employee', 'false', '28', '25', '3', 'true', '2025-02-10T10:00:00Z', '2025-11-01T08:15:00Z'])
    writer.writerow(['507f1f77bcf86cd799439013', 'Michael', 'Johnson', 'michael.j@company.com', '$2a$10$hashDEF789...', 'STAFF-00003', 'Finance', 'hod', 'true', '28', '18', '10', 'true', '2025-01-20T11:00:00Z', '2025-10-28T16:30:00Z'])
    writer.writerow(['507f1f77bcf86cd799439014', 'Sarah', 'Williams', 'sarah.w@company.com', '$2a$10$hashGHI012...', 'STAFF-00004', 'HR', 'hr', 'false', '28', '28', '0', 'true', '2025-03-05T09:00:00Z', '2025-03-05T09:00:00Z'])
    writer.writerow(['507f1f77bcf86cd799439015', 'David', 'Brown', 'david.b@company.com', '$2a$10$hashJKL345...', 'STAFF-00005', 'Operations', 'ged', 'false', '28', '22', '6', 'true', '2025-01-10T08:30:00Z', '2025-11-03T12:45:00Z'])
    writer.writerow(['507f1f77bcf86cd799439016', 'Emily', 'Davis', 'emily.d@company.com', '$2a$10$hashMNO678...', 'STAFF-00006', 'Marketing', 'employee', 'false', '28', '15', '13', 'true', '2025-04-12T10:30:00Z', '2025-11-04T09:20:00Z'])
    writer.writerow(['507f1f77bcf86cd799439017', 'Robert', 'Miller', 'robert.m@company.com', '$2a$10$hashPQR901...', 'STAFF-00007', 'Sales', 'employee', 'false', '28', '28', '0', 'false', '2024-12-01T07:00:00Z', '2025-10-15T14:00:00Z'])
    writer.writerow(['507f1f77bcf86cd799439018', 'Admin', 'User', 'admin@company.com', '$2a$10$hashSTU234...', 'STAFF-00008', 'IT', 'admin', 'false', '28', '28', '0', 'true', '2024-11-01T00:00:00Z', '2025-11-06T10:00:00Z'])
    
    writer.writerow([])
    writer.writerow([])
    
    # Sheet 2: LEAVES TABLE
    writer.writerow(['=== LEAVES COLLECTION (Sample Data) ==='])
    writer.writerow([])
    writer.writerow(['_id', 'employee', 'leaveType', 'fromDate', 'toDate', 'totalDays', 'reason', 'reliever', 'status', 'hodApprovalStatus', 'hodApprovalDate', 'hodApprovalComment', 'hrApprovalStatus', 'hrApprovalDate', 'hrApprovalComment', 'gedApprovalStatus', 'gedApprovalDate', 'gedApprovalComment', 'isEditable', 'isActive', 'createdAt'])
    writer.writerow(['607f191e810c19729de860ea', '507f1f77bcf86cd799439012', 'Annual Leave', '2025-11-10', '2025-11-15', '4', 'Family vacation', '507f1f77bcf86cd799439011', 'Pending', 'pending', '', '', 'pending', '', '', 'pending', '', '', 'true', 'true', '2025-11-05T10:00:00Z'])
    writer.writerow(['607f191e810c19729de860eb', '507f1f77bcf86cd799439012', 'Sick Leave', '2025-10-20', '2025-10-22', '2', 'Medical appointment', '507f1f77bcf86cd799439011', 'Approved', 'approved', '2025-10-19T14:30:00Z', 'Approved by HOD', 'approved', '2025-10-19T15:00:00Z', 'HR approved', 'approved', '2025-10-19T16:00:00Z', 'Final approval granted', 'false', 'true', '2025-10-18T09:00:00Z'])
    writer.writerow(['607f191e810c19729de860ec', '507f1f77bcf86cd799439016', 'Annual Leave', '2025-12-20', '2025-12-30', '7', 'Christmas holiday', '507f1f77bcf86cd799439011', 'Pending', 'approved', '2025-11-04T11:00:00Z', 'Approved for December', 'pending', '', '', 'pending', '', '', 'false', 'true', '2025-11-04T08:30:00Z'])
    writer.writerow(['607f191e810c19729de860ed', '507f1f77bcf86cd799439013', 'Casual Leave', '2025-11-08', '2025-11-08', '1', 'Personal matter', '507f1f77bcf86cd799439012', 'Rejected', 'rejected', '2025-11-06T09:00:00Z', 'Insufficient notice', 'pending', '', '', 'pending', '', '', 'false', 'true', '2025-11-06T08:00:00Z'])
    writer.writerow(['607f191e810c19729de860ee', '507f1f77bcf86cd799439016', 'Annual Leave', '2025-11-25', '2025-11-29', '5', 'Thanksgiving break', '507f1f77bcf86cd799439011', 'Pending', 'approved', '2025-11-05T10:30:00Z', 'OK', 'approved', '2025-11-05T14:00:00Z', 'Approved', 'pending', '', '', 'false', 'true', '2025-11-04T16:00:00Z'])
    
    writer.writerow([])
    writer.writerow([])
    
    # Sheet 3: ROLES
    writer.writerow(['=== USER ROLES & PERMISSIONS ==='])
    writer.writerow([])
    writer.writerow(['Role', 'Description', 'Can Create Leaves', 'Can Approve Leaves', 'Can Manage Users', 'Access Level'])
    writer.writerow(['employee', 'Regular employee', 'Yes', 'No', 'No', 'Basic'])
    writer.writerow(['hod', 'Head of Department (Stage 1 approver)', 'Yes', 'Yes (Dept only)', 'No', 'Department'])
    writer.writerow(['hr', 'Human Resources (Stage 2 approver)', 'Yes', 'Yes (HOD-approved)', 'No', 'Organization'])
    writer.writerow(['ged', 'General Executive Director (Stage 3 approver)', 'Yes', 'Yes (HR-approved)', 'No', 'Executive'])
    writer.writerow(['admin', 'System Administrator', 'Yes', 'Yes (All stages)', 'Yes', 'Full System'])
    
    writer.writerow([])
    writer.writerow([])
    
    # Sheet 4: DEPARTMENTS
    writer.writerow(['=== DEPARTMENTS ==='])
    writer.writerow([])
    writer.writerow(['Department', 'Description', 'Sample HOD'])
    writer.writerow(['IT', 'Information Technology', 'John Doe (STAFF-00001)'])
    writer.writerow(['Finance', 'Finance and Accounting', 'Michael Johnson (STAFF-00003)'])
    writer.writerow(['HR', 'Human Resources', 'Sarah Williams (STAFF-00004)'])
    writer.writerow(['Operations', 'Operations and Logistics', 'David Brown (STAFF-00005)'])
    writer.writerow(['Marketing', 'Marketing and Communications', ''])
    writer.writerow(['Sales', 'Sales and Business Development', ''])
    
    writer.writerow([])
    writer.writerow([])
    
    # Sheet 5: API ENDPOINTS
    writer.writerow(['=== ADMIN API ENDPOINTS ==='])
    writer.writerow([])
    writer.writerow(['Method', 'Endpoint', 'Access', 'Description', 'Full URL'])
    writer.writerow(['POST', '/api/admin/users', 'admin', 'Create new user', 'https://flowkit-backend-go.onrender.com/api/admin/users'])
    writer.writerow(['GET', '/api/admin/users', 'admin', 'Get all users', 'https://flowkit-backend-go.onrender.com/api/admin/users'])
    writer.writerow(['PUT', '/api/admin/users/:id', 'admin', 'Update user', 'https://flowkit-backend-go.onrender.com/api/admin/users/:id'])
    writer.writerow(['PUT', '/api/admin/users/:id/activate', 'admin', 'Activate user', 'https://flowkit-backend-go.onrender.com/api/admin/users/:id/activate'])
    writer.writerow(['PUT', '/api/admin/users/:id/deactivate', 'admin', 'Deactivate user', 'https://flowkit-backend-go.onrender.com/api/admin/users/:id/deactivate'])
    writer.writerow(['GET', '/api/hod/leaves', 'hod, admin', 'Get department leaves', 'https://flowkit-backend-go.onrender.com/api/hod/leaves'])
    writer.writerow(['PUT', '/api/hod/leaves/:id/approve', 'hod, admin', 'HOD approve (Stage 1)', 'https://flowkit-backend-go.onrender.com/api/hod/leaves/:id/approve'])
    writer.writerow(['PUT', '/api/hod/leaves/:id/reject', 'hod, admin', 'HOD reject', 'https://flowkit-backend-go.onrender.com/api/hod/leaves/:id/reject'])
    writer.writerow(['GET', '/api/hr/leaves', 'hr, admin', 'Get HOD-approved leaves', 'https://flowkit-backend-go.onrender.com/api/hr/leaves'])
    writer.writerow(['PUT', '/api/hr/leaves/:id/approve', 'hr, admin', 'HR approve (Stage 2)', 'https://flowkit-backend-go.onrender.com/api/hr/leaves/:id/approve'])
    writer.writerow(['PUT', '/api/hr/leaves/:id/reject', 'hr, admin', 'HR reject', 'https://flowkit-backend-go.onrender.com/api/hr/leaves/:id/reject'])
    writer.writerow(['GET', '/api/ged/leaves', 'ged, admin', 'Get HR-approved leaves', 'https://flowkit-backend-go.onrender.com/api/ged/leaves'])
    writer.writerow(['PUT', '/api/ged/leaves/:id/approve', 'ged, admin', 'GED approve (Stage 3 FINAL)', 'https://flowkit-backend-go.onrender.com/api/ged/leaves/:id/approve'])
    writer.writerow(['PUT', '/api/ged/leaves/:id/reject', 'ged, admin', 'GED reject', 'https://flowkit-backend-go.onrender.com/api/ged/leaves/:id/reject'])

print("✅ Excel-ready file created: FlowKit_Admin_Database_Sample.csv")
print("💡 Open this file in Microsoft Excel to see formatted tables with sample data!")
print("\n📊 Includes:")
print("   • Users table with 8 sample users")
print("   • Leaves table with 5 sample leave requests")
print("   • User roles and permissions")
print("   • Departments list")
print("   • All admin API endpoints")
