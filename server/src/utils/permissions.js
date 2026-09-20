// Define permissions for each role
export const ROLE_PERMISSIONS = {
  MASTER_ADMIN: [
    'view_dashboard',
    'view_transactions',
    'edit_transactions',
    'reconcile_transactions',
    'view_invoices',
    'create_invoices',
    'edit_invoices',
    'approve_payments',
    'view_reports',
    'use_ai',
    'connect_bank',
    'manage_connections',
    'manage_company',
    'manage_kyc',
    'invite_users',
    'remove_users',
    'manage_roles',
    'view_audit_logs'
  ],
  FINANCE_ADMIN: [
    'view_dashboard',
    'view_transactions',
    'edit_transactions',
    'reconcile_transactions',
    'view_invoices',
    'create_invoices',
    'edit_invoices',
    'approve_payments',
    'view_reports',
    'use_ai',
    'view_audit_logs'
  ],
  FINANCE_MEMBER: [
    'view_dashboard',
    'view_transactions',
    'reconcile_transactions',
    'view_invoices',
    'view_reports',
    'use_ai'
  ]
};

export const hasPermission = (role, permission) => {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions ? permissions.includes(permission) : false;
};
