import React from 'react'
import {
  Flex,
  VStack,
  TabPanel,
  Spinner,
  Select,
  IconButton,
  Box,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'

const PermissionTabPanel = ({
  isLoading,
  currentDepartment,
  handleDepartmentChange,
  currentRole,
  handleRoleChange,
  handlePermissionAdd,
  permissions,
  handlePermissionDelete,
}) => {
  const employeeReducer = useSelector((state) => state.employeeReducer)
  return (
    <TabPanel
      display="flex"
      justifyContent="center"
      height="calc(100vh - 300px)"
    >
      {isLoading ? (
        <Flex
          justifyContent="center"
          height="calc(100vh - 300px)"
          alignItems="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            size="xl"
            color="primaryBlue"
          />
        </Flex>
      ) : (
        <VStack
          paddingX={{ base: '5px', md: '20px' }}
          paddingY="20px"
          w="600px"
        >
          <Flex
            w="100%"
            gap={{ base: '10px', md: '20px' }}
            marginBottom="4"
            direction={{ base: 'column', md: 'row' }}
          >
            <Select
              id="department"
              type="text"
              borderColor="borderColor"
              onChange={handleDepartmentChange}
              value={currentDepartment}
            >
              {employeeReducer.department.map((item) => (
                <option
                  key={item.name}
                  style={{
                    color: 'rgb(75, 174, 226)',
                    background: 'rgb(0, 5, 5)',
                    fontSize: '20px',
                  }}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </Select>
            <Select
              id="role"
              type="text"
              borderColor="borderColor"
              onChange={handleRoleChange}
              value={currentRole}
            >
              {employeeReducer.role.map((item) => (
                <option
                  key={item.name}
                  style={{
                    color: 'rgb(75, 174, 226)',
                    background: 'rgb(0, 5, 5)',
                    fontSize: '20px',
                  }}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </Select>
            <IconButton
              bg="secondaryBorderColor"
              borderRadius={'20px'}
              _hover={{
                bg: 'primaryBlue',
                color: 'primaryBlack',
              }}
              icon={<AddIcon />}
              onClick={handlePermissionAdd}
            />
          </Flex>
          {permissions &&
            permissions.map((item, index) => (
              <Flex
                w={'100%'}
                alignItems="center"
                justifyContent="space-evenly"
                key={item.id}
                px={{ base: '10px', md: '40px' }}
                py="5px"
                cursor="pointer"
                mt={'0px'}
                _hover={{ bg: 'primaryBlack', color: 'primaryBlue' }}
              >
                <Box flex={1}>{`${item.department} ${item.role}`}</Box>
                <IconButton
                  bg="secondaryBorderColor"
                  borderRadius={'20px'}
                  size="xs"
                  _hover={{
                    bg: 'primaryBlue',
                    color: 'primaryBlack',
                  }}
                  icon={<CloseIcon />}
                  onClick={() => handlePermissionDelete(index, item.id)}
                />
              </Flex>
            ))}
        </VStack>
      )}
    </TabPanel>
  )
}

PermissionTabPanel.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  currentDepartment: PropTypes.string.isRequired,
  handleDepartmentChange: PropTypes.func.isRequired,
  currentRole: PropTypes.string.isRequired,
  handleRoleChange: PropTypes.func.isRequired,
  handlePermissionAdd: PropTypes.func.isRequired,
  permissions: PropTypes.array,
  handlePermissionDelete: PropTypes.func.isRequired,
}

export default PermissionTabPanel
