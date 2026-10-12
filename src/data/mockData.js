export const initialRecords = [
  {
    "id": "rec_1",
    "name": "Corporate Lease Agreement - Block A",
    "type": "Contract",
    "status": "Active",
    "owner": "Sarah Jenkins",
    "updatedDate": "2026-06-18",
    "description": "Lease agreement for corporate office space in Sector 62, block A. Renewed annually.",
    "category": "Real Estate",
    "notes": [
      "Landlord approved sublease clause.",
      "Rent increases by 5% in year 3."
    ],
    "activityLog": [
      {
        "time": "2026-06-18 14:30",
        "action": "Updated contract value",
        "user": "Sarah Jenkins"
      },
      {
        "time": "2026-06-12 09:15",
        "action": "Created record",
        "user": "Sarah Jenkins"
      }
    ]
  },
  {
    "id": "rec_2",
    "name": "FY26 Q2 Tax Compliance Filing",
    "type": "Financial",
    "status": "Pending Review",
    "owner": "Rajesh Exports (Finance Team)",
    "updatedDate": "2026-06-19",
    "description": "Quarterly GST and direct tax computation worksheets for verification before final submission.",
    "category": "Taxation",
    "notes": [
      "Waiting for audit reconciliation statement.",
      "ITC reconciliation is pending for state code 07."
    ],
    "activityLog": [
      {
        "time": "2026-06-19 11:00",
        "action": "Uploaded computation sheet",
        "user": "Rajesh Exports"
      },
      {
        "time": "2026-06-15 16:45",
        "action": "Created record",
        "user": "System Clerk"
      }
    ]
  },
  {
    "id": "rec_3",
    "name": "Intellectual Property Patent - UI Core",
    "type": "IP Asset",
    "status": "Approved",
    "owner": "Devon Lane",
    "updatedDate": "2026-06-10",
    "description": "Patent application for the proprietary multi-tenant layout engine algorithm.",
    "category": "IP & Trademark",
    "notes": [
      "Patent office issued receipt certificate.",
      "Next step: Publication in patent journal."
    ],
    "activityLog": [
      {
        "time": "2026-06-10 18:22",
        "action": "Marked approved by legal lead",
        "user": "Devon Lane"
      },
      {
        "time": "2026-05-20 10:30",
        "action": "Submitted filing papers",
        "user": "Devon Lane"
      }
    ]
  },
  {
    "id": "rec_4",
    "name": "NCLT Merger Petition Documents",
    "type": "Corporate Restructuring",
    "status": "Draft",
    "owner": "Sarah Jenkins",
    "updatedDate": "2026-06-20",
    "description": "Scheme of arrangement documentation for the upcoming merger of subsidiaries.",
    "category": "Corporate Law",
    "notes": [
      "Board resolution copy needs to be attached.",
      "Shareholder list compiled as of June 15th."
    ],
    "activityLog": [
      {
        "time": "2026-06-20 09:30",
        "action": "Drafted scheme agreement",
        "user": "Sarah Jenkins"
      }
    ]
  },
  {
    "id": "rec_5",
    "name": "Vendor Agreement - AWS Cloud Hosting",
    "type": "Contract",
    "status": "Under Review",
    "owner": "Alex Mercer",
    "updatedDate": "2026-06-17",
    "description": "SaaS hosting subscription terms of service and enterprise SLA agreement.",
    "category": "Infrastructure",
    "notes": [
      "Requesting 99.99% uptime guarantee clause.",
      "Addendum for GDPR compliance added."
    ],
    "activityLog": [
      {
        "time": "2026-06-17 15:40",
        "action": "Modified clause 4.2",
        "user": "Alex Mercer"
      },
      {
        "time": "2026-06-10 11:20",
        "action": "Created draft",
        "user": "Alex Mercer"
      }
    ]
  }
];
export const initialCases = [
  {
    "id": "case_1",
    "cnr": "TNCB0A0000732026",
    "caseNumber": "CC 250/2026",
    "title": "Deputy Commissioner of Income Tax Vs CIBI International Private Limited",
    "court": "Madras High Court",
    "status": "Active",
    "nextHearing": "2026-06-22",
    "judge": "Hon. Justice Srinivasan",
    "courtRoom": "20",
    "filingDate": "2026-01-20",
    "stage": "Next Stage Scheduled (eCourt Sync)",
    "opposingCounsel": "Adv. R. Krishnan",
    "leadCounsel": "Adv. Vivek Sharma",
    "category": "CORPORATE",
    "priority": "HIGH",
    "assignedJunior": "Alex Mercer",
    "clientCoordinates": {
      "clientName": "Sharma & Associates",
      "clientType": "Corporate",
      "phone": "+91 98765 43210",
      "email": "contact@sharma-law.com",
      "contactPersons": "Mr. Anil Sharma (CEO), Ms. Priya Sen (HR Head)"
    },
    "parties": [
      {
        "type": "Petitioner",
        "name": "Deputy Commissioner of Income Tax",
        "advocate": "Adv. S.R. Prasad"
      },
      {
        "type": "Respondent",
        "name": "CIBI International Private Limited",
        "advocate": "Adv. R. Krishnan"
      }
    ],
    "hearings": [
      {
        "date": "2026-01-20",
        "time": "09:56 AM",
        "purpose": "Matter Filed",
        "business": "Case CC 250/2026 lodged with Madras High Court Registry. Assigned Lead Counsel.",
        "judge": "Hon. Justice Srinivasan"
      },
      {
        "date": "2026-06-20",
        "time": "11:00 AM",
        "purpose": "Legal Hearing",
        "business": "Status hearing on preliminary objections raised by Respondents.",
        "judge": "Hon. Justice Srinivasan"
      },
      {
        "date": "2026-06-22",
        "time": "10:30 AM",
        "purpose": "Admission Hearing",
        "business": "Listed for final admission arguments. Parties directed to file written submissions.",
        "judge": "Hon. Justice Srinivasan"
      }
    ],
    "orders": [
      {
        "date": "2026-01-20",
        "type": "Filing Registry Order",
        "description": "Filing registered successfully.",
        "filename": "Filing_Registry_CC250.pdf",
        "content": "IN THE HIGH COURT OF MADRAS\n\nDeputy Commissioner of Income Tax\nVs\nCIBI International Private Limited\n\nRegistry has admitted the dossier CC 250/2026 for hearing before Bench 20 on 22.06.2026.\n\nSigned by Registrar (Original Side)\nDate: 20 January 2026"
      },
      {
        "date": "2026-06-20",
        "type": "Interim Order",
        "description": "Stay of demand granted pending admission.",
        "filename": "Interim_Stay_CC250.pdf",
        "content": "IN THE HIGH COURT OF MADRAS\n\nCC 250/2026\n\nUpon hearing the parties this day, it is ordered:\n\n1. There shall be an interim stay of the demand notice dated 01.01.2026 until the next date of hearing.\n2. Respondent to file counter affidavit within 4 weeks.\n3. Matter posted to 22.06.2026.\n\nHon. Justice Srinivasan"
      }
    ],
    "courtAppearances": [
      {
        "id": "app_1_1",
        "date": "2026-01-20",
        "time": "09:56 AM",
        "court": "Madras High Court",
        "courtRoom": "20",
        "judge": "Hon. Justice Srinivasan",
        "appearanceType": "Filing",
        "advocate": "Adv. Vivek Sharma",
        "purpose": "Initial Case Filing",
        "outcome": "Filed & Accepted",
        "notes": "Registry admitted the petition. Fee paid. Cause title verified.",
        "status": "Completed",
        "nextDate": "2026-06-20"
      },
      {
        "id": "app_1_2",
        "date": "2026-06-20",
        "time": "11:00 AM",
        "court": "Madras High Court",
        "courtRoom": "20",
        "judge": "Hon. Justice Srinivasan",
        "appearanceType": "Hearing",
        "advocate": "Adv. Vivek Sharma",
        "purpose": "Legal Hearing on Preliminary Objections",
        "outcome": "Interim Stay Granted",
        "notes": "Stay of demand notice granted. Counter affidavit directed within 4 weeks.",
        "status": "Completed",
        "nextDate": "2026-06-22"
      },
      {
        "id": "app_1_3",
        "date": "2026-06-22",
        "time": "10:30 AM",
        "court": "Madras High Court",
        "courtRoom": "20",
        "judge": "Hon. Justice Srinivasan",
        "appearanceType": "Admission",
        "advocate": "Adv. Vivek Sharma",
        "purpose": "Final Admission Arguments",
        "outcome": "Scheduled",
        "notes": "Written submissions to be filed 48hrs prior to hearing.",
        "status": "Upcoming",
        "nextDate": null
      }
    ],
    "notes": [
      "Obtained registry certificate copy.",
      "Opposing counsel served with paperbook sets."
    ]
  },
  {
    "id": "case_2",
    "cnr": "TNCH010092382022",
    "caseNumber": "OS 584/2022",
    "title": "P.Karunanithi Vs S.Muruganantham",
    "court": "Madras District Court",
    "status": "Pending",
    "nextHearing": "2026-07-15",
    "judge": "Hon. Judge R. Subramanian",
    "courtRoom": "05",
    "filingDate": "2022-09-12",
    "stage": "Evidence Submission",
    "opposingCounsel": "Adv. K. Ramasamy",
    "leadCounsel": "Adv. Vivek Sharma",
    "category": "CIVIL",
    "priority": "MEDIUM",
    "assignedJunior": "Devon Lane",
    "clientCoordinates": {
      "clientName": "P. Karunanithi",
      "clientType": "Individual",
      "phone": "+91 94440 12345",
      "email": "karunanithi@gmail.com",
      "contactPersons": "P. Karunanithi"
    },
    "parties": [
      {
        "type": "Petitioner",
        "name": "P. Karunanithi",
        "advocate": "Adv. Vivek Sharma"
      },
      {
        "type": "Respondent",
        "name": "S. Muruganantham",
        "advocate": "Adv. K. Ramasamy"
      }
    ],
    "hearings": [
      {
        "date": "2022-09-12",
        "time": "10:00 AM",
        "purpose": "Filed",
        "business": "Original suit filed regarding property dispute.",
        "judge": "Hon. Judge R. Subramanian"
      },
      {
        "date": "2026-06-05",
        "time": "11:00 AM",
        "purpose": "Evidence",
        "business": "Petitioner chief examination completed. Witness cross deferred.",
        "judge": "Hon. Judge R. Subramanian"
      },
      {
        "date": "2026-07-15",
        "time": "11:00 AM",
        "purpose": "Cross Examination",
        "business": "Scheduled cross-examination of petitioner witness.",
        "judge": "Hon. Judge R. Subramanian"
      }
    ],
    "orders": [],
    "courtAppearances": [
      {
        "id": "app_2_1",
        "date": "2022-09-12",
        "time": "10:00 AM",
        "court": "Madras District Court",
        "courtRoom": "05",
        "judge": "Hon. Judge R. Subramanian",
        "appearanceType": "Filing",
        "advocate": "Adv. Vivek Sharma",
        "purpose": "Original Suit Filing",
        "outcome": "Filed & Numbered",
        "notes": "Property dispute OS filed. Valued at Rs. 45 Lakhs.",
        "status": "Completed",
        "nextDate": "2026-06-05"
      },
      {
        "id": "app_2_2",
        "date": "2026-06-05",
        "time": "11:00 AM",
        "court": "Madras District Court",
        "courtRoom": "05",
        "judge": "Hon. Judge R. Subramanian",
        "appearanceType": "Evidence",
        "advocate": "Adv. Vivek Sharma",
        "purpose": "Chief Examination of Petitioner",
        "outcome": "Examination Completed",
        "notes": "PW-1 examination completed. Defendant's cross deferred to next date.",
        "status": "Completed",
        "nextDate": "2026-07-15"
      },
      {
        "id": "app_2_3",
        "date": "2026-07-15",
        "time": "11:00 AM",
        "court": "Madras District Court",
        "courtRoom": "05",
        "judge": "Hon. Judge R. Subramanian",
        "appearanceType": "Cross Examination",
        "advocate": "Adv. Vivek Sharma",
        "purpose": "Cross Examination of PW-1",
        "outcome": "Scheduled",
        "notes": "Witness summon to village officer sent.",
        "status": "Upcoming",
        "nextDate": null
      }
    ],
    "notes": [
      "Witness summon sent to village officer."
    ]
  },
  {
    "id": "case_3",
    "cnr": "DLHC010351552024",
    "caseNumber": "WP(C) 4920/2024",
    "title": "Rajesh Exports Pvt Ltd vs Deputy Commissioner of Income Tax",
    "court": "Delhi High Court",
    "status": "Active",
    "nextHearing": "2026-06-22",
    "judge": "Hon'ble Mr. Justice Yashwant Varma",
    "courtRoom": "14",
    "filingDate": "2024-03-12",
    "stage": "Arguments",
    "opposingCounsel": "S.R. Prasad, Standing Counsel",
    "leadCounsel": "Adv. Vivek Sharma",
    "category": "CORPORATE",
    "priority": "HIGH",
    "assignedJunior": "Alex Mercer",
    "clientCoordinates": {
      "clientName": "Rajesh Export Team",
      "clientType": "Corporate",
      "phone": "+91 80234 56789",
      "email": "legal@rajeshexports.com",
      "contactPersons": "Mr. R. Rajesh (Director)"
    },
    "parties": [
      {
        "type": "Petitioner",
        "name": "Rajesh Exports Pvt Ltd",
        "advocate": "Adv. Vivek Sharma"
      },
      {
        "type": "Respondent",
        "name": "DCIT",
        "advocate": "S.R. Prasad"
      }
    ],
    "hearings": [
      {
        "date": "2024-03-12",
        "time": "10:00 AM",
        "purpose": "Filed",
        "business": "Writ petition filed challenging demand notice.",
        "judge": "Hon'ble Mr. Justice Yashwant Varma"
      },
      {
        "date": "2026-06-20",
        "time": "11:00 AM",
        "purpose": "Legal Hearing",
        "business": "Arguments on merits commenced. Revenue side arguments heard.",
        "judge": "Hon'ble Mr. Justice Yashwant Varma"
      },
      {
        "date": "2026-06-22",
        "time": "10:30 AM",
        "purpose": "Final Disposal",
        "business": "Listed in Court Room 14, Item 25. Final oral submissions.",
        "judge": "Hon'ble Mr. Justice Yashwant Varma"
      }
    ],
    "orders": [
      {
        "date": "2024-03-15",
        "type": "Notice Order",
        "description": "Notice issued to Revenue Department.",
        "filename": "Notice_WPC4920.pdf",
        "content": "IN THE HIGH COURT OF DELHI AT NEW DELHI\n\nW.P.(C) 4920/2024\n\nRajesh Exports Pvt Ltd\n...Petitioner\n\nVersus\n\nDeputy Commissioner of Income Tax\n...Respondent\n\nNotice\n\nNotice is issued to the respondents, returnable in 4 weeks. In the meanwhile, there will be an interim stay of all coercive action.\n\nJustice Yashwant Varma\nDelhi High Court\nDated: 15.03.2024"
      }
    ],
    "courtAppearances": [
      {
        "id": "app_3_1",
        "date": "2024-03-12",
        "time": "10:00 AM",
        "court": "Delhi High Court",
        "courtRoom": "14",
        "judge": "Hon'ble Mr. Justice Yashwant Varma",
        "appearanceType": "Filing",
        "advocate": "Adv. Vivek Sharma",
        "purpose": "Writ Petition Filing",
        "outcome": "Filed & Admitted",
        "notes": "Challan deposited. Paper book filed. Urgent mention made.",
        "status": "Completed",
        "nextDate": "2024-03-15"
      },
      {
        "id": "app_3_2",
        "date": "2024-03-15",
        "time": "10:00 AM",
        "court": "Delhi High Court",
        "courtRoom": "14",
        "judge": "Hon'ble Mr. Justice Yashwant Varma",
        "appearanceType": "Notice",
        "advocate": "Adv. Vivek Sharma",
        "purpose": "Notice to Respondents",
        "outcome": "Notice Issued, Stay Granted",
        "notes": "Interim stay of all coercive action granted till further orders.",
        "status": "Completed",
        "nextDate": "2026-06-20"
      },
      {
        "id": "app_3_3",
        "date": "2026-06-20",
        "time": "11:00 AM",
        "court": "Delhi High Court",
        "courtRoom": "14",
        "judge": "Hon'ble Mr. Justice Yashwant Varma",
        "appearanceType": "Arguments",
        "advocate": "Adv. Vivek Sharma",
        "purpose": "Merits Arguments",
        "outcome": "Part Heard",
        "notes": "Revenue side arguments heard. Petitioner's reply arguments on 22.06.2026.",
        "status": "Completed",
        "nextDate": "2026-06-22"
      },
      {
        "id": "app_3_4",
        "date": "2026-06-22",
        "time": "10:30 AM",
        "court": "Delhi High Court",
        "courtRoom": "14",
        "judge": "Hon'ble Mr. Justice Yashwant Varma",
        "appearanceType": "Final Arguments",
        "advocate": "Adv. Vivek Sharma",
        "purpose": "Final Oral Submissions",
        "outcome": "Scheduled",
        "notes": "Item 25 on board. Challan deposit confirmed.",
        "status": "Upcoming",
        "nextDate": null
      }
    ],
    "notes": [
      "Challan deposit done."
    ]
  }
];
export const initialClients = [
  {
    "id": "client_1",
    "name": "Sarah Jenkins",
    "company": "LeaseHoldings Ltd",
    "email": "sarah.j@leaseholdings.com",
    "phone": "+91 98765 43210",
    "avatar": "SJ",
    "linkedCases": [],
    "linkedRecords": [
      "rec_1",
      "rec_4"
    ],
    "notes": [
      "Prefers communication via email.",
      "Focuses on retail commercial leasing."
    ],
    "documents": [
      {
        "name": "Board_Resolution_Leasing.pdf",
        "date": "2026-06-10",
        "size": "1.2 MB"
      },
      {
        "name": "Rent_Ledger_2025.xlsx",
        "date": "2026-06-05",
        "size": "450 KB"
      }
    ]
  },
  {
    "id": "client_2",
    "name": "Rajesh Export Team",
    "company": "Rajesh Exports Pvt Ltd",
    "email": "legal@rajeshexports.com",
    "phone": "+91 80234 56789",
    "avatar": "RE",
    "linkedCases": [
      "case_3"
    ],
    "linkedRecords": [
      "rec_2"
    ],
    "notes": [
      "Large corporate tax disputes handling.",
      "Prompt responder on documentation."
    ],
    "documents": [
      {
        "name": "Tax_Demand_Notice_2026.pdf",
        "date": "2026-04-05",
        "size": "3.4 MB"
      },
      {
        "name": "Challan_Deposit_Receipt.pdf",
        "date": "2026-06-02",
        "size": "890 KB"
      }
    ]
  },
  {
    "id": "client_3",
    "name": "Devon Lane",
    "company": "SaaSify Technologies",
    "email": "devon@saasify.io",
    "phone": "+91 99001 12233",
    "avatar": "DL",
    "linkedCases": [],
    "linkedRecords": [
      "rec_3"
    ],
    "notes": [
      "Tech startup patent work client.",
      "Active investor."
    ],
    "documents": [
      {
        "name": "Patent_Draft_V4.pdf",
        "date": "2026-06-01",
        "size": "5.1 MB"
      }
    ]
  },
  {
    "id": "client_4",
    "name": "Apex Logistics Corp",
    "company": "Apex Logistics Corp",
    "email": "ops@apexlogistics.com",
    "phone": "+91 73000 99911",
    "avatar": "AL",
    "linkedCases": [
      "case_2"
    ],
    "linkedRecords": [
      "rec_5"
    ],
    "notes": [
      "Industrial land dispute and vendor contracts client."
    ],
    "documents": [
      {
        "name": "MIDC_Lease_Deed.pdf",
        "date": "2025-10-12",
        "size": "8.2 MB"
      }
    ]
  }
];
export const initialTasks = [
  {
    "id": "task_1",
    "title": "File deposit receipt in registry (Delhi HC)",
    "dueDate": "2026-06-21",
    "assignedUser": "Sarah Jenkins",
    "status": "todo"
  },
  {
    "id": "task_2",
    "title": "Audit Q2 tax compliance data sheets",
    "dueDate": "2026-06-22",
    "assignedUser": "Sarah Jenkins",
    "status": "in_progress"
  },
  {
    "id": "task_3",
    "title": "Prepare witness statement for Apex vs MIDC",
    "dueDate": "2026-06-25",
    "assignedUser": "Alex Mercer",
    "status": "todo"
  },
  {
    "id": "task_4",
    "title": "Finalize AWS Cloud SLA clauses",
    "dueDate": "2026-06-20",
    "assignedUser": "Devon Lane",
    "status": "done"
  },
  {
    "id": "task_5",
    "title": "Board Resolution draft review",
    "dueDate": "2026-06-24",
    "assignedUser": "Sarah Jenkins",
    "status": "in_progress"
  }
];
export const initialNotifications = [
  {
    "id": "not_1",
    "type": "case_update",
    "title": "eCourts Sync Successful",
    "message": "Case Rajesh Exports vs DCIT next hearing set for 22nd June 2026.",
    "time": "10 mins ago",
    "read": false,
    "clientName": "Rajesh Export Team"
  },
  {
    "id": "not_2",
    "type": "task_reminder",
    "title": "Task Due Tomorrow",
    "message": "File deposit receipt in Delhi High Court is due tomorrow.",
    "time": "2 hours ago",
    "read": false,
    "clientName": "Sharma & Associates"
  },
  {
    "id": "not_3",
    "type": "system_alert",
    "title": "API Credit Alert",
    "message": "eCourts API subscription has 1,240 credits remaining.",
    "time": "1 day ago",
    "read": true
  }
];
export const initialActivities = [
  {
    "id": "act_1",
    "user": "Sarah Jenkins",
    "action": "uploaded a document",
    "target": "Board_Resolution_Leasing.pdf",
    "time": "Today, 10:15 AM"
  },
  {
    "id": "act_2",
    "user": "System Scheduler",
    "action": "synchronized case data",
    "target": "DLHC010351552024 via eCourts API",
    "time": "Today, 09:00 AM"
  },
  {
    "id": "act_3",
    "user": "Devon Lane",
    "action": "completed task",
    "target": "Finalize AWS Cloud SLA clauses",
    "time": "Yesterday, 05:30 PM"
  },
  {
    "id": "act_4",
    "user": "Alex Mercer",
    "action": "added a note to case",
    "target": "Apex Logistics vs MIDC",
    "time": "2 days ago"
  }
];
export const initialRbacMatrix = {
  "admin": {
    "label": "Admin",
    "avatar": "AD",
    "color": "#4f46e5",
    "permissions": {
      "read": true,
      "write": true,
      "delete": true,
      "sync": true,
      "config": true,
      "export": true,
      "addCase": true,
      "editCase": true,
      "deleteCase": true,
      "addClient": true,
      "editClient": true,
      "deleteClient": true,
      "addTask": true,
      "editTask": true,
      "deleteTask": true,
      "viewSettings": true,
      "manageUsers": true
    }
  },
  "senior": {
    "label": "Senior Advocate",
    "avatar": "SA",
    "color": "#0ea5e9",
    "permissions": {
      "read": true,
      "write": true,
      "delete": true,
      "sync": true,
      "config": false,
      "export": true,
      "addCase": true,
      "editCase": true,
      "deleteCase": true,
      "addClient": true,
      "editClient": true,
      "deleteClient": true,
      "addTask": true,
      "editTask": true,
      "deleteTask": true,
      "viewSettings": false,
      "manageUsers": false
    }
  },
  "junior": {
    "label": "Jr Advocate",
    "avatar": "JA",
    "color": "#10b981",
    "permissions": {
      "read": true,
      "write": true,
      "delete": false,
      "sync": false,
      "config": false,
      "export": false,
      "addCase": false,
      "editCase": true,
      "deleteCase": false,
      "addClient": false,
      "editClient": true,
      "deleteClient": false,
      "addTask": true,
      "editTask": true,
      "deleteTask": false,
      "viewSettings": false,
      "manageUsers": false
    }
  }
};
export const initialUsers = [
  {
    "id": "user_1",
    "name": "Vivek Sharma",
    "email": "vivek@advocateos.com",
    "role": "admin",
    "avatar": "VS",
    "color": "#4f46e5"
  },
  {
    "id": "user_2",
    "name": "Sarah Jenkins",
    "email": "sarah@advocateos.com",
    "role": "senior",
    "avatar": "SJ",
    "color": "#0ea5e9"
  },
  {
    "id": "user_3",
    "name": "Alex Mercer",
    "email": "alex@advocateos.com",
    "role": "junior",
    "avatar": "AM",
    "color": "#10b981"
  },
  {
    "id": "user_4",
    "name": "Devon Lane",
    "email": "devon@advocateos.com",
    "role": "junior",
    "avatar": "DL",
    "color": "#f59e0b"
  }
];
export const initialAppointments = [
  {
    "id": "appt_1",
    "clientName": "Sarah Jenkins",
    "company": "LeaseHoldings Ltd",
    "date": "2026-06-22",
    "time": "02:00 PM",
    "type": "Video Call",
    "purpose": "Lease Deed Revision Consultation",
    "status": "Scheduled",
    "notes": "Review Clause 4 and tenant liability clauses.",
    "videoPlatform": "Google Meet",
    "videoLink": "https://meet.google.com/abc-defg-hij",
    "phone": "+91 98765 43210"
  },
  {
    "id": "appt_2",
    "clientName": "Rajesh Export Team",
    "company": "Rajesh Exports Pvt Ltd",
    "date": "2026-06-23",
    "time": "11:00 AM",
    "type": "In-Person",
    "purpose": "Tax Assessment Appeal Prep",
    "status": "Scheduled",
    "notes": "Requires auditor present with state compliance files.",
    "location": "Universal Case Chambers, 4th Floor, Room 402",
    "phone": "+91 80234 56789"
  },
  {
    "id": "appt_3",
    "clientName": "Devon Lane",
    "company": "SaaSify Technologies",
    "date": "2026-06-25",
    "time": "04:30 PM",
    "type": "Phone Call",
    "purpose": "Patent Draft Review",
    "status": "Scheduled",
    "notes": "Verify algorithm claims and international filing protocols.",
    "phone": "+91 99001 12233"
  }
];
