import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ActivityPanel = ({ messages, notifications, inquiries, onMarkAsRead, onReply }) => {
  const [activeTab, setActiveTab] = useState('messages');

  const tabs = [
    { id: 'messages', label: 'Messages', icon: 'MessageCircle', count: messages?.filter(m => m?.unread)?.length },
    { id: 'notifications', label: 'Notifications', icon: 'Bell', count: notifications?.filter(n => n?.unread)?.length },
    { id: 'inquiries', label: 'Inquiries', icon: 'HelpCircle', count: inquiries?.filter(i => i?.unread)?.length }
  ];

  const MessageItem = ({ message }) => (
    <div className={`p-4 border-b border-border hover:bg-muted/20 transition-smooth ${message?.unread ? 'bg-primary/5' : ''}`}>
      <div className="flex items-start space-x-3">
        <Image
          src={message?.senderAvatar}
          alt={message?.senderName}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-foreground truncate">
              {message?.senderName}
            </p>
            <span className="text-xs text-muted-foreground font-caption">
              {message?.timestamp}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {message?.content}
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Reply"
              onClick={() => onReply(message?.id)}
            >
              Reply
            </Button>
            {message?.unread && (
              <Button
                variant="ghost"
                size="sm"
                iconName="Check"
                onClick={() => onMarkAsRead(message?.id)}
              >
                Mark Read
              </Button>
            )}
          </div>
        </div>
        {message?.unread && (
          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
        )}
      </div>
    </div>
  );

  const NotificationItem = ({ notification }) => (
    <div className={`p-4 border-b border-border hover:bg-muted/20 transition-smooth ${notification?.unread ? 'bg-primary/5' : ''}`}>
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg ${
          notification?.type === 'success' ? 'bg-success/10 text-success' :
          notification?.type === 'warning' ? 'bg-warning/10 text-warning' :
          notification?.type === 'error'? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
        }`}>
          <Icon name={notification?.icon} size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-foreground">
              {notification?.title}
            </p>
            <span className="text-xs text-muted-foreground font-caption">
              {notification?.timestamp}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {notification?.message}
          </p>
          {notification?.unread && (
            <Button
              variant="ghost"
              size="sm"
              iconName="Check"
              onClick={() => onMarkAsRead(notification?.id)}
              className="mt-2"
            >
              Mark Read
            </Button>
          )}
        </div>
        {notification?.unread && (
          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
        )}
      </div>
    </div>
  );

  const InquiryItem = ({ inquiry }) => (
    <div className={`p-4 border-b border-border hover:bg-muted/20 transition-smooth ${inquiry?.unread ? 'bg-primary/5' : ''}`}>
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Icon name="Building" size={16} className="text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-foreground">
              {inquiry?.organizationName}
            </p>
            <span className="text-xs text-muted-foreground font-caption">
              {inquiry?.timestamp}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            <strong>Subject:</strong> {inquiry?.subject}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {inquiry?.message}
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Reply"
              onClick={() => onReply(inquiry?.id)}
            >
              Respond
            </Button>
            {inquiry?.unread && (
              <Button
                variant="ghost"
                size="sm"
                iconName="Check"
                onClick={() => onMarkAsRead(inquiry?.id)}
              >
                Mark Read
              </Button>
            )}
          </div>
        </div>
        {inquiry?.unread && (
          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'messages':
        return messages?.length > 0 ? (
          messages?.map((message) => (
            <MessageItem key={message?.id} message={message} />
          ))
        ) : (
          <div className="p-8 text-center">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No messages yet</p>
          </div>
        );

      case 'notifications':
        return notifications?.length > 0 ? (
          notifications?.map((notification) => (
            <NotificationItem key={notification?.id} notification={notification} />
          ))
        ) : (
          <div className="p-8 text-center">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications</p>
          </div>
        );

      case 'inquiries':
        return inquiries?.length > 0 ? (
          inquiries?.map((inquiry) => (
            <InquiryItem key={inquiry?.id} inquiry={inquiry} />
          ))
        ) : (
          <div className="p-8 text-center">
            <Icon name="HelpCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No inquiries</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">Activity Center</h3>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-smooth ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              {tab?.count > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full font-mono">
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      {/* Content */}
      <div className="max-h-96 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default ActivityPanel;