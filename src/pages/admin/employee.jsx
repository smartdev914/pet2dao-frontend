import React, { useEffect, useRef, useState } from 'react'
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
  useDisclosure,
  IconButton,
  Button,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import SideBar from './sidebar'
import EditEmployee from './editEmployee'
import {
  getAllEmployee,
  updateEmployee,
  deleteEmployee,
} from 'store/actions/employeeAction'
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
    {
      Header: 'Edit',
      id: 'edit',
      Cell: (item) => {
        return (
          <Flex justifyContent="center" gap="1">
            <IconButton
              size="sm"
              onClick={() => handleEditEmployee(item.row.original)}
              icon={<EditIcon />}
            />
            <IconButton
              size="sm"
              onClick={() => handleDeleteIcon(item.row.original.id)}
              icon={<DeleteIcon />}
            />
          </Flex>
        )
      },
    },
  ]

  const dispatch = useDispatch()
  const managerDisclosure = useDisclosure()
  const editDisclosure = useDisclosure()
  const targetManagerId = useRef(0)
  const targetUserId = useRef(0)
  const currentSelectedColumn = useRef(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isDelete, setIsDelete] = useState(false)
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

  const handleDeleteIcon = (index) => {
    setIsDelete(true)
    targetUserId.current = index
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
    dispatch(updateEmployee(currentEmployee.id, { ...data }))
  }

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee)
    editDisclosure.onOpen()
  }

  const handleDeleteEmployee = () => {
    dispatch(deleteEmployee(targetUserId.current))
    setIsDelete(false)
    managerDisclosure.onClose()
  }

  const handleCreateEmployee = () => {
    setSelectedEmployee(null)
    editDisclosure.onOpen()
  }

  useEffect(() => {
    dispatch(getAllEmployee())
  }, [])

  return (
    <React.Fragment>
      <Layout activeId="manager">
        <Flex mt={{ base: '10px', md: '24px' }}>
          <SideBar activeId="employee" />
          <VStack
            px={{ base: '10px', md: '32px' }}
            width={{ base: '100%', lg: '78%' }}
            overflowX={{ base: 'scroll', md: 'auto' }}
            alignItems="baseline"
          >
            <Flex
              w="100%"
              pb={'20px'}
              direction="row"
              justifyContent={'space-between'}
            >
              <Button
                mr={3}
                onClick={() => {}}
                sx={{ display: { md: 'contents', sm: 'none', xs: 'none' } }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Button>
              <Text
                fontSize={{ base: '24px', md: '28px' }}
                textAlign={'center'}
                color="whiteAlpha.900"
              >
                Employee
              </Text>
              <RoundButton onClick={handleCreateEmployee} mr={3} theme="purple">
                Create
              </RoundButton>
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
              {isDelete ? 'Delete' : 'Update'} Employee
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This Employee will be{' '}
              {isDelete ? 'deleted' : 'updated'}.
            </AlertDialogBody>

            <AlertDialogFooter gap="2">
              <RoundButton onClick={managerDisclosure.onClose}>
                Cancel
              </RoundButton>
              <RoundButton
                onClick={isDelete ? handleDeleteEmployee : handleManagerUpdate}
                ml={3}
                theme="purple"
              >
                {isDelete ? 'Delete' : 'Update'}
              </RoundButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <EditEmployee
        employee={selectedEmployee}
        isOpen={editDisclosure.isOpen}
        onClose={editDisclosure.onClose}
      />
    </React.Fragment>
  )
}

export default Employee
