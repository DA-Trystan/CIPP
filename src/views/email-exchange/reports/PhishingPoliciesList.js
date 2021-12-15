import React from 'react'
import { useSelector } from 'react-redux'
import TenantSelector from '../../../components/cipp/TenantSelector'
import CippDatatable from '../../../components/cipp/CippDatatable'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cellBooleanFormatter, cellDateFormatter } from '../../../components/cipp'

//TODO: Add CellBoolean
const columns = [
  {
    selector: (row) => row['Name'],
    name: 'Name',
    sortable: true,
  },
  {
    selector: (row) => row['PhishThresholdLevel'],
    name: 'Phish Threshold Level',
    sortable: true,
  },
  {
    selector: (row) => row['Enabled'],
    name: 'Enabled',
    sortable: true,
    cell: cellBooleanFormatter(),
  },
  {
    selector: (row) => row['ExcludedSenders'],
    name: 'Excluded Senders',
    sortable: true,
    cell: cellBooleanFormatter(),
  },
  {
    selector: (row) => row['ExcludedDomains'],
    name: 'Excluded Domains',
    sortable: true,
    cell: cellBooleanFormatter(),
  },
  {
    selector: (row) => row['WhenChangedUTC'],
    name: 'Last Change Date',
    sortable: true,
    cell: cellDateFormatter(),
  },
]

const MailboxList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <div>
      <TenantSelector />
      <hr />
      <div className="bg-white rounded p-5">
        <h3>Phising Policy List</h3>
        {Object.keys(tenant).length === 0 && <span>Select a tenant to get started.</span>}
        <CippDatatable
          keyField="id"
          reportName={`${tenant?.defaultDomainName}-Autopilot-List`}
          path="/api/ListPhishPolicies"
          columns={columns}
          params={{ TenantFilter: tenant?.defaultDomainName }}
        />
      </div>
    </div>
  )
}

export default MailboxList
