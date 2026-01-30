
export enum Priority {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export enum Intent {
  RFQ = 'RFQ',
  COMPLAINT = 'Complaint',
  INQUIRY = 'Inquiry',
  ESCALATION = 'Escalation'
}

export enum Sentiment {
  POSITIVE = 'Positive',
  NEUTRAL = 'Neutral',
  NEGATIVE = 'Negative',
  URGENT = 'Urgent'
}

export type EmailStatus = 'PENDING' | 'ROUTED' | 'OVERRIDDEN';

export interface Email {
  id: string;
  sender: string;
  subject: string;
  content: string;
  timestamp: string;
  priority: Priority;
  intent: Intent;
  sentiment: Sentiment;
  slaRisk: number; // 0 to 100
  timeRemaining: string; // e.g., "14m", "2h", "1d"
  confidence: number; // 0 to 1
  department: string;
  status: EmailStatus;
  summary: string;
  aiRationale: {
    priority: string;
    intent: string;
    sentiment: string;
    sla: string;
  };
  suggestedReply: string;
}

export interface RoutingRule {
  intent: Intent;
  primaryDept: string;
  secondaryDept: string;
  confidenceThreshold: number;
  autoExecute: boolean;
}

export interface PerformanceMetric {
  label: string;
  value: number | string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export type ScreenState = 'LOGIN' | 'TRIAGE' | 'DETAIL' | 'ROUTING' | 'ANALYTICS' | 'VALIDATION';
