FINPILOT Login, Authentication & Company Workspace System

1. Purpose

This document defines the authentication, company/workspace, KYC, membership, roles, permissions, and team-invitation architecture for FINPILOT.

The goal is to create a secure multi-tenant SaaS foundation where:

Every person has their own FINPILOT account.

A company owns its financial workspace and financial data.

Users access company data through company membership.

Roles and permissions control what each member can do.

The person who creates a company is not automatically the Master Admin.

KYC/verification determines the authorized company representative who becomes Master Admin.

Users can log in from different devices without losing access to their company workspace.

The architecture can support one user belonging to multiple companies in the future.

2. Core Mental Model

The most important concept in FINPILOT is:

PERSON
   ↓
USER ACCOUNT
   ↓
COMPANY MEMBERSHIP
   ↓
COMPANY WORKSPACE
   ↓
FINANCIAL DATA

Do not think:

"I am giving three people access to my account."

Think:

"I am adding three users as members of my company's workspace."

The company owns the financial data.

Users are members of the company.

3. Authentication vs Authorization

FINPILOT must separate authentication and authorization.

Authentication

Authentication answers:

Who are you?

Example:

Rahul
rahul@example.com
Password
        ↓
Authenticated User

Authorization

Authorization answers:

Which company can you access and what are you allowed to do?

Example:

Rahul
   ↓
Company Membership
   ↓
ABC Technologies
   ↓
FINANCE_MEMBER
   ↓
Allowed permissions

This separation is fundamental to the architecture.

4. Company Creator Is Not Automatically Master Admin

This is a critical FINPILOT rule.

The person who initially creates the FINPILOT account or company is not automatically the Master Admin.

The initial user is considered an onboarding/setup user.

The company goes through verification/KYC.

During the verification process, FINPILOT determines the authorized company representative.

That person becomes:

MASTER_ADMIN

Example:

Rahul creates FINPILOT account
        ↓
Rahul creates ABC Technologies
        ↓
Rahul = onboarding/setup user
        ↓
Company verification
        ↓
Priya is identified as authorized representative
        ↓
Priya = MASTER_ADMIN

Rahul can remain a company member with another appropriate role.

The system must never assume:

company.createdBy === MASTER_ADMIN

5. Complete Onboarding Flow

New Company

Landing Page
     ↓
Sign Up
     ↓
Create Personal User Account
     ↓
Email Verification
     ↓
Create Company
     ↓
Company Information
     ↓
KYC / Company Verification
     ↓
Determine Authorized Representative
     ↓
Assign MASTER_ADMIN
     ↓
Connect Financial Accounts
     ↓
Invite Team Members
     ↓
Onboarding Complete
     ↓
Dashboard

6. Returning User Login Flow

Login
  ↓
Authenticate User
  ↓
Find User Account
  ↓
Find Company Memberships
  ↓
Check Membership Status
  ↓
Determine Workspace
  ↓
Load Role + Permissions
  ↓
Dashboard

If the user belongs to one company:

Login
  ↓
ABC Technologies
  ↓
Dashboard

If the user belongs to multiple companies:

Login
  ↓
Select Workspace
  ├── ABC Technologies
  └── XYZ Ventures

7. Login From Any Device

Company membership must be stored in the backend database.

It must NOT depend on:

Laptop

Browser

IP address

Device

Local storage

A specific computer

Example:

Rahul
   ↓
User ID: U002
   ↓
CompanyMember
   ↓
Company ID: C001
   ↓
ABC Technologies

Rahul can log in from:

Laptop
Phone
Office computer
Another browser
Another device

The backend still identifies:

Rahul → C001 → ABC Technologies

because the relationship is stored in the database.

8. Database Architecture

8.1 Users

Collection:

users

Example:

{
  _id,
  name,
  email,
  passwordHash,
  emailVerified,
  status,
  createdAt,
  updatedAt
}

Rules:

Email must be normalized to lowercase.

Passwords must never be stored in plaintext.

Passwords should be hashed using bcrypt/bcryptjs.

Authentication credentials belong to the user account.

9. Companies

Collection:

companies

Example:

{
  _id,
  legalName,
  displayName,
  businessType,
  registrationNumber,
  country,
  industry,
  kycStatus,
  kycVerifiedAt,
  authorizedRepresentativeUserId,
  maxMembers,
  createdBy,
  createdAt,
  updatedAt
}

Possible KYC statuses:

PENDING
IN_REVIEW
VERIFIED
REJECTED

For the prototype, KYC can be simulated.

10. Company Membership

Collection:

companyMembers

Example:

{
  _id,
  companyId,
  userId,
  role,
  status,
  permissions,
  invitedBy,
  joinedAt,
  createdAt,
  updatedAt
}

This collection is the relationship between users and companies.

Conceptually:

User
  ↓
CompanyMember
  ↓
Company

Do not put only companyId directly on the User model because a user may belong to multiple companies in the future.

11. Invitations

Collection:

invitations

Example:

{
  _id,
  companyId,
  email,
  role,
  tokenHash,
  expiresAt,
  status,
  invitedBy,
  acceptedAt,
  createdAt
}

Statuses:

PENDING
ACCEPTED
EXPIRED
CANCELLED

Invitation tokens should be securely generated.

Prefer storing a token hash instead of the raw token.

12. Roles

Initial FINPILOT roles:

MASTER_ADMIN
FINANCE_ADMIN
FINANCE_MEMBER

MASTER_ADMIN

The Master Admin represents the company's authorized administrator.

Typical access:

Company settings

KYC

Financial connections

Financial data

Transactions

Reconciliation

Invoices

Reports

AI

Team management

Permissions

Audit logs

FINANCE_ADMIN

Broad finance access.

Typical access:

Dashboard

Transactions

Reconciliation

Invoices

Reports

AI

Financial operations

Audit log viewing

Some company-level administrative actions may remain restricted.

FINANCE_MEMBER

Finance-focused access.

Typical access:

Dashboard

Transactions

Reconciliation

Invoices

Reports

AI

They should not automatically have access to:

KYC

Company administration

Financial connection management

Team management

13. Permissions

Do not build the entire authorization system using repeated checks such as:

if (role === "MASTER_ADMIN")

Instead, use permissions.

Example permissions:

view_dashboard
view_transactions
edit_transactions
reconcile_transactions

view_invoices
create_invoices
edit_invoices

approve_payments

view_reports
use_ai

connect_bank
manage_connections

manage_company
manage_kyc

invite_users
remove_users
manage_roles

view_audit_logs

Roles map to permissions.

Example:

MASTER_ADMIN
    ↓
All permissions

FINANCE_ADMIN
    ↓
Finance + selected administrative permissions

FINANCE_MEMBER
    ↓
Finance viewing/operational permissions

This makes the system easier to extend later.

14. Company Seat Limit

For the initial prototype:

Maximum members = 4

Meaning:

1 Master Admin
+
3 additional members

Do not hard-code "3 users" throughout the application.

Use:

company.maxMembers

This allows future plans such as:

Starter → 4 members
Growth → 10 members
Business → 25 members
Enterprise → Custom

15. Team Invitation Flow

Master Admin or another user with:

invite_users

permission can invite members.

Example:

ABC Technologies

Seats:
1 / 4 used

Invite Team Member

Admin enters:

Email
Role

Example:

rahul@example.com
FINANCE_MEMBER

The system creates an invitation.

16. Invited User Flow

User Does Not Have FINPILOT Account

Invitation Email
       ↓
Accept Invitation
       ↓
Create FINPILOT Account
       ↓
Verify Email
       ↓
Accept Invitation
       ↓
Create CompanyMember
       ↓
ABC Technologies Workspace
       ↓
Dashboard

The invited user does NOT create another company.

User Already Has FINPILOT Account

Invitation Email
       ↓
Accept Invitation
       ↓
Login
       ↓
Accept Invitation
       ↓
Create CompanyMember
       ↓
ABC Technologies

The existing User record is reused.

Do not create duplicate users.

17. Workspace Isolation

Workspace isolation is one of the most important security requirements.

Every financial record must belong to a company.

For example:

Transaction {
  companyId,
  ...
}

Invoice {
  companyId,
  ...
}

Connection {
  companyId,
  ...
}

AuditLog {
  companyId,
  ...
}

18. Backend Authorization Flow

For every protected financial API request:

Request
  ↓
Authenticate User
  ↓
Identify User
  ↓
Identify Company
  ↓
Check Company Membership
  ↓
Check Membership Status
  ↓
Check Permission
  ↓
Execute Operation
  ↓
Return Authorized Data

The frontend is NOT the security boundary.

The backend must enforce authorization.

19. Example of Workspace Protection

Suppose:

Rahul

belongs to:

ABC Technologies
Company ID: C001

Rahul requests:

GET /api/companies/C001/transactions

The backend verifies:

Rahul → C001

Access allowed.

If Rahul requests:

GET /api/companies/C002/transactions

and Rahul is not a member of C002:

403 ACCESS_DENIED

No C002 data should be returned.

20. Financial Connections

Financial connections belong to the company workspace.

Correct:

ABC Technologies
      ↓
HDFC Bank Connection
      ↓
Company Financial Data

Incorrect:

Rahul
   ↓
Rahul's HDFC connection

The connection is a company resource.

Example:

{
  _id,
  companyId,
  provider,
  type,
  status,
  lastSyncedAt,
  createdBy,
  createdAt
}

Connection types:

BANK
ACCOUNTING
PAYMENTS

For the prototype, use simulated connections.

Never ask users for:

Bank passwords

OTPs

PINs

Sensitive banking credentials

21. KYC Prototype

The prototype can simulate KYC.

Suggested flow:

Step 1 — Company Details

Collect:

Legal Company Name
Display Name
Business Type
Industry
Country
Registration Number

Step 2 — Authorized Representative

Collect:

Name
Email
Position / Title

Step 3 — Review

Display the information.

Step 4 — Verification

Prototype action:

Simulate Verification

After verification:

Company:
ABC Technologies

Verification:
VERIFIED

Authorized Representative:
Priya Sharma

Workspace Role:
MASTER_ADMIN

Real production KYC should later be connected to an appropriate provider/process.

The prototype must not claim to perform real regulatory KYC.

22. Audit Logs

Financial software should maintain an audit trail.

Collection:

auditLogs

Example:

{
  _id,
  companyId,
  userId,
  action,
  resource,
  resourceId,
  metadata,
  createdAt
}

Examples:

USER_REGISTERED
COMPANY_CREATED
KYC_STARTED
KYC_VERIFIED
MASTER_ADMIN_ASSIGNED
INVITATION_SENT
INVITATION_ACCEPTED
USER_REMOVED
BANK_CONNECTED
BANK_DISCONNECTED
TRANSACTION_EDITED
INVOICE_CREATED

Every important action should identify:

WHO
WHAT
WHICH COMPANY
WHEN

Example:

Rahul Sharma
connected HDFC Bank

ABC Technologies

20 Sep 2026
10:42 PM

23. Authentication API

Suggested endpoints:

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

POST /api/auth/verify-email
POST /api/auth/forgot-password
POST /api/auth/reset-password

Authentication should use secure mechanisms.

For a production-minded implementation, HTTP-only cookies are preferable to storing sensitive authentication tokens in localStorage.

24. Company API

Suggested endpoints:

POST /api/companies
GET /api/companies/:companyId
PATCH /api/companies/:companyId

KYC:

POST /api/companies/:companyId/kyc
POST /api/companies/:companyId/kyc/verify

Members:

GET /api/companies/:companyId/members
PATCH /api/companies/:companyId/members/:memberId
DELETE /api/companies/:companyId/members/:memberId

Invitations:

POST /api/companies/:companyId/invitations
GET /api/companies/:companyId/invitations
POST /api/invitations/:token/accept

25. Protected Routes

Frontend routes:

/
 /demo

/login
/signup
/verify-email
/forgot-password
/reset-password

/onboarding
/onboarding/company
/onboarding/verification
/onboarding/connections
/onboarding/team
/onboarding/complete

/dashboard

/team
/settings
/settings/company
/settings/security
/settings/connections
/audit-log

Unauthenticated users attempting to access:

/dashboard
/team
/settings
/audit-log

should be redirected to:

/login

26. Onboarding Progress

The onboarding experience should use a clear progress indicator:

1. Company
2. Verification
3. Connections
4. Team
5. Complete

Example:

FINPILOT

Company
●────
Verification
○────
Connections
○────
Team
○────
Complete
○

The user should always know where they are in onboarding.

27. Dashboard Workspace Context

After login, the dashboard should clearly identify the current company.

Example:

ABC Technologies

Finance Workspace

Current User:
Rahul Sharma

Role:
Finance Member

Include a workspace selector even if the user currently has only one company.

This prepares the UI for future multi-company support.

28. Multi-Company Support

A user may eventually belong to multiple companies.

Example:

Rahul

ABC Technologies
Role: FINANCE_ADMIN

XYZ Ventures
Role: FINANCE_ADMIN

After login:

Select Workspace

ABC Technologies
XYZ Ventures

The current workspace should be treated as context.

Conceptually:

userId + workspaceId

The backend still verifies that the user actually belongs to that workspace.

29. Master Admin Transfer

FINPILOT should support changing the Master Admin.

Example:

Current Master Admin:
Priya Sharma

Transfer Master Admin

Select:
Rahul Sharma

Show an explicit confirmation:

This will transfer company administrative authority
to Rahul Sharma.

After confirmation:

Rahul → MASTER_ADMIN
Priya → FINANCE_ADMIN

The final role of the old Master Admin should be explicitly selected or defined by the system.

Never allow a company to accidentally end up without an authorized Master Admin.

30. Security Requirements

The authentication/workspace system should include:

Password hashing

Secure authentication

HTTP-only cookies when using cookie-based sessions

Secure password reset tokens

Email normalization

Authentication rate limiting

Input validation

Workspace authorization

Permission checks

Invitation expiration

Secure invitation tokens

Audit logs

Environment variables for secrets

No banking passwords

No OTP collection

No sensitive credentials in frontend code

Create:

.env.example

Never expose secrets to the React frontend.

31. Error Handling

Use consistent API responses.

Success:

{
  success: true,
  data: {}
}

Error:

{
  success: false,
  error: {
    code: "ACCESS_DENIED",
    message: "You do not have permission to access this workspace."
  }
}

Use appropriate status codes:

401 → Unauthenticated
403 → Unauthorized
404 → Not Found
409 → Conflict
422 → Validation Error
500 → Server Error

32. Frontend Authentication State

Create a centralized authentication state.

For example:

AuthContext

Expose:

user
company
membership
role
permissions
loading
isAuthenticated

Example:

const {
  user,
  company,
  membership,
  permissions,
  isAuthenticated
} = useAuth();

Create a reusable helper:

hasPermission("invite_users")

Components should use permissions rather than duplicating role logic.

33. Team Management UI

Example:

TEAM

ABC Technologies

Seats
3 / 4 used

Members

Priya Sharma
MASTER ADMIN
Active

Rahul Sharma
FINANCE ADMIN
Active

Amit Kumar
FINANCE MEMBER
Active

Pending Invitations

Neha Singh
FINANCE MEMBER
Pending

[ Invite Team Member ]

Actions should only appear when the current user has permission.

34. Development Seed Data

For development, create fake users and company data.

Example:

ABC Technologies

Users:

Priya Sharma
priya@example.com

Rahul Sharma
rahul@example.com

Amit Kumar
amit@example.com

Neha Singh
neha@example.com

Example roles:

Priya → MASTER_ADMIN
Rahul → FINANCE_ADMIN
Amit → FINANCE_MEMBER
Neha → FINANCE_MEMBER

These must be clearly fake development accounts.

Never use real financial credentials.

35. Important Test Scenarios

Test 1 — User Registration

A new user signs up.

Expected:

User created.

The user is not automatically Master Admin.

Test 2 — Company Creation

User creates company.

Expected:

Company created.
User enters onboarding/setup state.

Test 3 — KYC Verification

Authorized representative is selected.

Expected:

KYC = VERIFIED
Authorized Representative = selected user
Selected user = MASTER_ADMIN

Test 4 — Invitation

Master Admin invites Rahul.

Expected:

Invitation created.

Test 5 — Invitation Acceptance

Rahul accepts invitation.

Expected:

CompanyMember created.
Rahul can access ABC Technologies.

Test 6 — Login From Another Device

Rahul logs in from another browser.

Expected:

Rahul
  ↓
Company membership
  ↓
ABC Technologies
  ↓
Dashboard

No company data should be lost.

Test 7 — Unauthorized Workspace

Rahul attempts to access another company.

Expected:

403 ACCESS_DENIED

Test 8 — Finance Member Invitation

Finance Member attempts to invite a user.

Expected:

403 ACCESS_DENIED

Test 9 — Seat Limit

Company has:

4 / 4 members

Another invitation should be rejected.

Test 10 — Existing User Invitation

An existing FINPILOT user accepts an invitation.

Expected:

Existing User reused.
No duplicate User created.

Test 11 — Multiple Companies

User belongs to two companies.

Expected:

Workspace selector appears.

Test 12 — Protected Dashboard

Unauthenticated user visits:

/dashboard

Expected:

Redirect to /login

Test 13 — Incomplete Onboarding

Authenticated user has incomplete onboarding.

Expected:

Redirect to appropriate onboarding step.

Test 14 — Master Admin Transfer

Master Admin transfers ownership/administrative authority.

Expected:

New user → MASTER_ADMIN
Previous Master Admin → selected lower role

36. Recommended Project Structure

Adapt this structure to the existing project instead of creating duplicate architecture.

server/
  models/
    User.js
    Company.js
    CompanyMember.js
    Invitation.js
    Connection.js
    AuditLog.js

  routes/
    auth.routes.js
    company.routes.js
    member.routes.js
    invitation.routes.js
    connection.routes.js
    audit.routes.js

  controllers/
    auth.controller.js
    company.controller.js
    member.controller.js
    invitation.controller.js
    connection.controller.js

  middleware/
    auth.js
    authorization.js
    validation.js

  services/
    auth.service.js
    company.service.js
    invitation.service.js
    audit.service.js

  utils/
    permissions.js
    tokens.js

Frontend:

client/
  src/
    pages/
      auth/
      onboarding/
      dashboard/
      team/
      settings/

    components/
      auth/
      onboarding/
      workspace/
      team/

    context/
      AuthContext.jsx

    hooks/
      useAuth.js
      usePermissions.js

The exact structure should follow the existing FINPILOT codebase where practical.

37. FINPILOT Architecture Summary

The complete identity and workspace architecture is:

                         FINPILOT
                            │
                            ▼
                     USER ACCOUNT
                            │
                            ▼
                    AUTHENTICATION
                            │
                            ▼
                  COMPANY MEMBERSHIP
                            │
                            ▼
                   COMPANY WORKSPACE
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
            KYC            TEAM       CONNECTIONS
             │              │              │
             └──────────────┼──────────────┘
                            │
                            ▼
                     FINANCIAL DATA
                            │
                            ▼
                       AI / AI OPS
                            │
                            ▼
                    HUMAN APPROVAL
                            │
                            ▼
                         ACTION
                            │
                            ▼
                       AUDIT LOG

38. Core Principles

The FINPILOT login and workspace system must follow these principles:

1. Every person gets their own account.

Never use shared company credentials.

2. Companies own financial data.

Users do not personally own the company's financial data.

3. Membership connects people to companies.

User → CompanyMember → Company

4. The company creator is not automatically Master Admin.

KYC determines the authorized company representative.

5. Backend controls access.

The frontend is never the security boundary.

6. Every financial record belongs to a company.

Use:

companyId

for financial resources.

7. Roles control access through permissions.

Use a scalable permission system instead of hard-coded role checks everywhere.

8. Users can log in from any device.

Company membership exists in the backend database.

9. Users can eventually belong to multiple companies.

Do not permanently bind a User to one Company.

10. Financial connections belong to the company.

Not to individual employees.

39. Final Mental Model

The easiest way for a developer to understand FINPILOT is:

LOGIN
  ↓
"Who are you?"
  ↓
USER
  ↓
"What companies can you access?"
  ↓
COMPANY MEMBERSHIP
  ↓
"Which company are you currently using?"
  ↓
WORKSPACE
  ↓
"What are you allowed to do?"
  ↓
ROLE + PERMISSIONS
  ↓
"What financial information can you access?"
  ↓
COMPANY FINANCIAL DATA

Therefore:

Authentication identifies the person.

Membership connects the person to a company.

The workspace represents the company.

Roles and permissions control access.

KYC determines the authorized Master Admin.

The company owns the financial data.

Audit logs record important actions.

This architecture should be treated as the foundation for all future FINPILOT finance, AI, banking, accounting, and automation features.