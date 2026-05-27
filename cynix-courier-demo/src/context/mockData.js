export const mockCustomers = [
  { id: 'C001', name: 'Trisha Williams', email: 'customer@demo.com', phone: '+1242-555-0100', mailbox: 'CYN-00142' },
  { id: 'C002', name: 'Michael Davies', email: 'michael@example.com', phone: '+1242-555-0101', mailbox: 'CYN-00215' },
  { id: 'C003', name: 'Sarah Smith', email: 'sarah@example.com', phone: '+1242-555-0102', mailbox: 'CYN-00302' },
  { id: 'C004', name: 'John Doe', email: 'john@example.com', phone: '+1242-555-0103', mailbox: 'CYN-00411' },
  { id: 'C005', name: 'Emma Johnson', email: 'emma@example.com', phone: '+1242-555-0104', mailbox: 'CYN-00599' },
  { id: 'C006', name: 'David Brown', email: 'david@example.com', phone: '+1242-555-0105', mailbox: 'CYN-00620' },
  { id: 'C007', name: 'Lisa Taylor', email: 'lisa@example.com', phone: '+1242-555-0106', mailbox: 'CYN-00788' },
  { id: 'C008', name: 'James Wilson', email: 'james@example.com', phone: '+1242-555-0107', mailbox: 'CYN-00833' },
];

export const STATUS_LIST = [
  'Received at US Warehouse',
  'In Transit to Bahamas',
  'Arrived at Bahamas Warehouse',
  'Ready for Collection',
  'Out for Delivery',
  'Delivered',
  'Failed Delivery'
];

function generatePackages() {
  const pkgs = [];
  let counter = 1000;
  
  const addPkg = (status, dutyFlag) => {
    const pId = `PKG-${counter++}`;
    const customer = mockCustomers[Math.floor(Math.random() * mockCustomers.length)];
    const weight = (Math.random() * 5 + 0.5).toFixed(1);
    
    // Build timeline
    const timeline = [];
    const statusIndex = STATUS_LIST.indexOf(status);
    let time = Date.now() - (statusIndex * 86400000); // 1 day per status back
    for(let i=0; i<=statusIndex; i++) {
       // Skip Out for Delivery or Failed if it's Ready for collection etc.
       if (i > 3 && statusIndex <= 3) continue;
       timeline.push({
         status: STATUS_LIST[i],
         timestamp: new Date(time).toISOString(),
         note: ''
       });
       time += 86400000; // next status 1 day later
    }

    pkgs.push({
      id: pId,
      trackingNumber: `CYN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      externalTracking: `1Z${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
      customerId: customer.id,
      weight: parseFloat(weight),
      dimensions: '30x20x15',
      value: Math.floor(Math.random() * 300) + 20,
      status: status,
      dutyFlag: dutyFlag,
      timeline: timeline,
      deliveryPreference: statusIndex < 3 ? 'Unselected' : (Math.random() > 0.5 ? 'Delivery' : 'Pickup'),
      driverId: status === 'Out for Delivery' ? 'D001' : null
    });
  };

  // Generate counts per PRD
  for(let i=0; i<5; i++) addPkg('Received at US Warehouse', false);
  for(let i=0; i<6; i++) addPkg('In Transit to Bahamas', i % 3 === 0);
  for(let i=0; i<7; i++) addPkg('Arrived at Bahamas Warehouse', i % 4 === 0);
  for(let i=0; i<5; i++) addPkg('Ready for Collection', false);
  for(let i=0; i<4; i++) addPkg('Out for Delivery', false);
  for(let i=0; i<6; i++) addPkg('Delivered', i % 2 === 0);
  for(let i=0; i<2; i++) addPkg('Failed Delivery', false);

  return pkgs;
}

export const mockPackages = generatePackages();

export const mockInvoices = mockPackages
  .filter(p => STATUS_LIST.indexOf(p.status) >= 2) // Invoice created when arrived
  .map(p => ({
    id: `INV-${p.id.split('-')[1]}`,
    packageId: p.id,
    customerId: p.customerId,
    amount: (p.weight * 5) + (p.dutyFlag ? p.value * 0.1 : 0) + 10, // weight fee + duty + service
    status: (p.status === 'Delivered' || p.status === 'Ready for Collection') && Math.random() > 0.3 ? 'Paid' : 'Unpaid',
    date: p.timeline.find(t => t.status === 'Arrived at Bahamas Warehouse')?.timestamp || new Date().toISOString()
  }));
