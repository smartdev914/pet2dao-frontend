import React, { useEffect, useRef } from 'react'
import { Layout, CustomTable, RoundButton } from 'components'
import {
  Flex,
  Text,
  VStack,
  Checkbox,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  // Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import SideBar from './sidebar'
import { getAllEmployee, updateEmployee } from 'store/actions/employeeAction'
import { shortWeb3Acount } from 'utils/utils'

function Employee() {
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Department',
      accessor: 'department.name',
    },
    {
      Header: 'Role',
      accessor: 'role.name',
    },
    {
      Header: 'Account Address',
      accessor: 'sortAddr',
    },
    {
      Header: 'Approved',
      id: 'approved',
      accessor: () => 'approved',
      Cell: (item) => {
        return (
          <Checkbox
            borderColor="secondaryBorderColor"
            isChecked={item.row.original.isApproved}
            onChange={() => handleToggleApproved(item.row.index)}
          />
        )
      },
    },
    {
      Header: 'Manager',
      id: 'manager',
      accessor: () => 'manager',

      Cell: (item) => {
        return (
          <Checkbox
            borderColor="secondaryBorderColor"
            isChecked={item.row.original.isManager}
            onChange={() => handleToggleManager(item.row.index)}
          />
        )
      },
    },
  ]

  const toast = useToast()
  const dispatch = useDispatch()
  const managerDisclosure = useDisclosure()
  const cancelRef = useRef()
  const targetManagerId = useRef(0)
  const targetUserId = useRef(0)
  const currentSelectedColumn = useRef(null)
  const employeeReducer = useSelector((state) => state.employeeReducer)
  const { employee } = employeeReducer

  let convertedEmployee = []
  if (employee.length > 0) {
    convertedEmployee = employee.map((item) => {
      return { ...item, sortAddr: shortWeb3Acount(item.accountAddr) }
    })
  }

  const handleToggleManager = (index) => {
    targetManagerId.current = index
    currentSelectedColumn.current = 'manager'
    managerDisclosure.onOpen()
  }

  const handleToggleApproved = (index) => {
    targetUserId.current = index
    currentSelectedColumn.current = 'user'
    managerDisclosure.onOpen()
  }

  const handleManagerUpdate = () => {
    managerDisclosure.onClose()
    const currentEmployee =
      employee[
        currentSelectedColumn.current == 'manager'
          ? targetManagerId.current
          : targetUserId.current
      ]
    const data =
      currentSelectedColumn.current == 'manager'
        ? {
            isManager: !currentEmployee.isManager,
          }
        : {
            isApproved: !currentEmployee.isApproved,
          }
    dispatch(updateEmployee(currentEmployee.id, { ...data }, toast))
  }

  useEffect(() => {
    dispatch(getAllEmployee())
  }, [])

  return (
    <React.Fragment>
      <Layout activeId="manager">
        <Flex mt="24px">
          <SideBar activeId="employee" />
          <VStack paddingLeft="32px" width={'78%'}>
            <Flex pb={'20px'} direction="column">
              <Text fontSize="28px" textAlign={'center'} color="whiteAlpha.900">
                Employee
              </Text>
            </Flex>
            <CustomTable columns={columns} data={convertedEmployee} />
          </VStack>
        </Flex>
      </Layout>
      <AlertDialog
        isOpen={managerDisclosure.isOpen}
        onClose={managerDisclosure.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="primaryBackground" color="textColor">
            <AlertDialogHeader
              bg="primaryBlue"
              fontSize="lg"
              fontWeight="bold"
              color="primaryBlack"
            >
              Update Employee
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This Employee will be updated.
            </AlertDialogBody>

            <AlertDialogFooter>
              <RoundButton ref={cancelRef} onClick={managerDisclosure.onClose}>
                Cancel
              </RoundButton>
              <RoundButton onClick={handleManagerUpdate} ml={3}>
                Update
              </RoundButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </React.Fragment>
  )
}

export default Employee
