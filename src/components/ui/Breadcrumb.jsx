import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/': 'Home',
    '/authentication-screen-login-register': 'Authentication',
    '/donor-dashboard': 'Dashboard',
    '/item-donation-listing': 'Donate Items',
    '/ngo-discovery-and-matching': 'Find NGOs',
    '/ngo-dashboard-post-verification': 'NGO Dashboard',
    '/impact-tracking-and-proof-verification': 'Track Impact',
    '/profile': 'Profile',
    '/settings': 'Settings',
    '/help': 'Help'
  };

  const generateBreadcrumbs = () => {
    if (customItems) return customItems;

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/donor-dashboard' }];

    let currentPath = '';
    pathSegments?.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = routeMap?.[currentPath] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      breadcrumbs?.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) return null;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbs?.map((item, index) => (
        <div key={item?.path} className="flex items-center space-x-2">
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {index === breadcrumbs?.length - 1 ? (
            <span className="text-foreground font-medium font-caption" aria-current="page">
              {item?.label}
            </span>
          ) : (
            <button
              onClick={() => handleNavigation(item?.path)}
              className="hover:text-foreground transition-smooth font-caption"
            >
              {item?.label}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;