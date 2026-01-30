
import { Email, Priority, Intent, Sentiment, RoutingRule } from '../types';

export const routingRules: RoutingRule[] = [
  { intent: Intent.RFQ, primaryDept: 'Sales & Estimations', secondaryDept: 'After-Market Spares', confidenceThreshold: 0.85, autoExecute: true },
  { intent: Intent.ESCALATION, primaryDept: 'Quality Assurance (QA)', secondaryDept: 'Plant Operations', confidenceThreshold: 0.90, autoExecute: false },
  { intent: Intent.COMPLAINT, primaryDept: 'Logistics & Documentation', secondaryDept: 'Customer Relations', confidenceThreshold: 0.80, autoExecute: true },
  { intent: Intent.INQUIRY, primaryDept: 'Engineering Support', secondaryDept: 'General Sales', confidenceThreshold: 0.75, autoExecute: true },
];

export const mockEmails: Email[] = [
  {
    id: 'LNT-V-4092',
    sender: 'engineering@reliance.petro.com',
    subject: 'Technical Query: Fire-Safe Certification for DBB Ball Valves (Order #9921)',
    content: 'Dear L&T Valves Team,\n\nWe are reviewing the technical submittal for the Double Block and Bleed (DBB) Ball Valves intended for the Jamnagar expansion. \n\nWe noticed a discrepancy in the API 607 Fire-Safe certification dates. Can you confirm the testing was conducted at the Coimbatore facility under the latest 7th Edition standards? This is a showstopper for the site arrival inspection scheduled for tomorrow.',
    timestamp: '2023-11-15T08:30:00Z',
    priority: Priority.CRITICAL,
    intent: Intent.ESCALATION,
    sentiment: Sentiment.URGENT,
    slaRisk: 95,
    timeRemaining: '8m',
    confidence: 0.97,
    department: 'Quality Assurance (QA)',
    status: 'PENDING',
    summary: 'Critical discrepancy in Fire-Safe certification for DBB Ball Valves. Potential site rejection at Jamnagar tomorrow.',
    aiRationale: {
      priority: 'CRITICAL: Detected "showstopper" and "site arrival inspection tomorrow". High risk of project delay penalties.',
      intent: 'Escalation: Triggered by certification discrepancy and immediate compliance requirement.',
      sentiment: 'Urgent: Technical professional tone with high-stakes ultimatum.',
      sla: 'SLA BREACH IMMINENT: Quality queries have a 4-hour window. Current queue load 92%.'
    },
    suggestedReply: 'Dear Reliance Engineering Team, we have verified the API 607 7th Ed records for the Coimbatore facility. Certification #API-607-9921 is being transmitted to your site team immediately.'
  },
  {
    id: 'LNT-V-4093',
    sender: 'procurement@saudiaramco.sa',
    subject: 'RFQ: Urgent Spare Gaskets and Seals for Triple Offset Butterfly Valves',
    content: 'L&T Sales,\n\nWe require an urgent quote for 200 replacement Graphite Gaskets and O-ring kits for our 24" Triple Offset Butterfly Valves currently in service at the Ras Tanura refinery. \n\nPlease ensure materials meet NACE MR0175/ISO 15156 standards for sour service. Need delivery schedule within 48 hours.',
    timestamp: '2023-11-15T09:15:00Z',
    priority: Priority.HIGH,
    intent: Intent.RFQ,
    sentiment: Sentiment.NEUTRAL,
    slaRisk: 42,
    timeRemaining: '2.5h',
    confidence: 0.91,
    department: 'After-Market Spares',
    status: 'PENDING',
    summary: 'High-volume RFQ for NACE-compliant gaskets for Ras Tanura refinery operations.',
    aiRationale: {
      priority: 'HIGH: Strategic account (Saudi Aramco) + "urgent delivery" + "sour service" technical complexity.',
      intent: 'RFQ: Automated extraction of "200 replacement kits" and "NACE standards".',
      sentiment: 'Neutral-Professional: Standard procurement communication.',
      sla: 'STABLE: 24h window for spares RFQ. Routing to After-Market Spares priority queue.'
    },
    suggestedReply: 'Dear Aramco Procurement, your RFQ for Ras Tanura is received. Our spares division is verifying stock of NACE MR0175 compliant kits.'
  },
  {
    id: 'LNT-V-4094',
    sender: 'j.bloggs@epc-global.co.uk',
    subject: 'Delay in MTC (Material Test Certificate) for Gate Valves',
    content: 'We are still waiting for the MTCs for the 12" Class 600 Gate Valves shipped last Tuesday. The EPC inspector will not release the piping assembly without these certificates. Please resolve.',
    timestamp: '2023-11-15T10:00:00Z',
    priority: Priority.HIGH,
    intent: Intent.COMPLAINT,
    sentiment: Sentiment.NEGATIVE,
    slaRisk: 78,
    timeRemaining: '52m',
    confidence: 0.88,
    department: 'Logistics & Documentation',
    status: 'PENDING',
    summary: 'Documentation delay (MTC) blocking EPC assembly progress. High customer frustration.',
    aiRationale: {
      priority: 'HIGH: Detected "will not release assembly" - indicates bottleneck in the supply chain flow.',
      intent: 'Complaint: Specifically regarding missing documentation (MTC) post-shipment.',
      sentiment: 'Negative: Expresses frustration and blockage of operational workflow.',
      sla: 'AT RISK: Documentation requests for EPC projects have a 2-hour response threshold.'
    },
    suggestedReply: 'We apologize for the oversight. The MTCs for the Class 600 Gate Valves are being uploaded to the EPC portal now.'
  }
];
