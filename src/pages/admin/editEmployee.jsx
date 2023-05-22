import React from 'react'
import PropTypes from 'prop-types'
import { RoundButton } from 'components'
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from '@chakra-ui/react'
import { Formik } from 'formik'
import { useSelector } from 'react-redux'
import { validateName, validateEthAddr } from 'utils/utils'

const MainFormLabel = ({ label, upperCase }) => {
  return (
    <FormLabel
      fontSize={{ base: '16px', md: '20px' }}
      mt="10px"
      mb="0px"
      color="white"
    >
      {upperCase ? label.toUpperCase() : label}
    </FormLabel>
  )
}

MainFormLabel.propTypes = {
  label: PropTypes.string.isRequired,
  upperCase: PropTypes.bool,
}

function EditEmployee({ employee, isOpen, onClose }) {
  const employeeReducer = useSelector((state) => state.employeeReducer)

  const formik = {
    initialValues: employee
      ? {
          ...employee,
          department: employee.department.name,
          role: employee.role.name,
        }
      : {
          name: '',
          department: { name: '' },
          role: { name: '' },
          accountAddr: '',
        },
    validate: (values) => {
      const errors = {}
      errors.name = validateName(values.name)
      errors.accountAddr = validateEthAddr(values.accountAddr)
      return errors
    },
    onSubmit: async (values) => {
      console.log(values)
    },
  }

  return (
    <Modal
      isOpen={isOpen}
      size={{ base: 'sm', md: '2xl' }}
      onClose={onClose}
      variant="primary"
    >
      <ModalOverlay>
        <ModalContent bg="primaryBackground" color="textColor">
          <ModalHeader
            bg="primaryBlue"
            fontSize="lg"
            fontWeight="bold"
            color="primaryBlack"
          >
            {formik.initialValues.id ? 'Edit' : 'Create'} Employee
          </ModalHeader>

          <Formik
            initialValues={formik.initialValues}
            validate={formik.validate}
            onSubmit={formik.onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleBlur,
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <ModalBody>
                    <VStack
                      width={'100%'}
                      borderColor="secondaryBorderColor"
                      color={'whiteAlpha.800'}
                    >
                      <FormControl isRequired>
                        <MainFormLabel label="Name" />
                        <Input
                          name="name"
                          spellCheck="false"
                          placeholder="Name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.name && touched.name && (
                          <Text color="red.500"> {errors.name}</Text>
                        )}
                      </FormControl>

                      <FormControl isRequired>
                        <MainFormLabel label="Department" />
                        <Select
                          name="department"
                          type="text"
                          borderColor="borderColor"
                          onChange={handleChange}
                          value={values.department}
                          onBlur={handleBlur}
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
                      </FormControl>

                      <FormControl isRequired>
                        <MainFormLabel label="Role" />
                        <Select
                          name="role"
                          type="text"
                          borderColor="borderColor"
                          onChange={handleChange}
                          value={values.role}
                          onBlur={handleBlur}
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
                      </FormControl>

                      <FormControl isRequired>
                        <MainFormLabel label="Account Address" />
                        <Input
                          name="accountAddr"
                          type="text"
                          placeholder="Account Address"
                          onChange={handleChange}
                          value={values.accountAddr}
                          onBlur={handleBlur}
                        />
                        {errors.accountAddr && touched.accountAddr && (
                          <Text color="red.500"> {errors.accountAddr}</Text>
                        )}
                      </FormControl>
                    </VStack>
                  </ModalBody>

                  <ModalFooter>
                    <RoundButton onClick={onClose}>Cancel</RoundButton>
                    <RoundButton theme="purple" type="submit" ml={3}>
                      Save
                    </RoundButton>
                  </ModalFooter>
                </form>
              )
            }}
          </Formik>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

EditEmployee.propTypes = {
  employee: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

EditEmployee.defaultProps = {}

export default EditEmployee
