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
import { useSelector, useDispatch } from 'react-redux'
import { createEmployee, updateEmployee } from 'store/actions/employeeAction'
import { validateName, validateEthAddr } from 'utils/utils'
import _ from 'lodash'
import { toastError } from 'utils/log'

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
  const dispatch = useDispatch()

  const formik = {
    initialValues: employee
      ? {
          ...employee,
          departmentId: employee.departmentId.toString(),
          roleId: employee.roleId.toString(),
        }
      : {
          name: '',
          departmentId: 0,
          roleId: 0,
          accountAddr: '',
        },

    validate: (values) => {
      const errors = {}
      if (validateName(values.name)) errors.name = validateName(values.name)
      if (validateEthAddr(values.accountAddr))
        errors.accountAddr = validateEthAddr(values.accountAddr)
      if (values.departmentId === 0)
        errors.departmentId = 'Please select deparment'
      if (values.roleId === 0) errors.roleId = 'Please select role'
      return errors
    },

    onSubmit: (values, { setSubmitting }) => {
      if (values.id) {
        if (_.isEqual(formik.initialValues, values)) {
          toastError('Nothing to Update.')
          setSubmitting(false)
          return
        } else
          dispatch(
            updateEmployee(
              values.id,
              {
                ...values,
                departmentId: parseInt(values.departmentId),
                roleId: parseInt(values.roleId),
              },
              onClose,
            ),
          )
      } else {
        dispatch(createEmployee(values))
        onClose()
      }
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
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
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
                        name="departmentId"
                        type="text"
                        borderColor="borderColor"
                        onChange={handleChange}
                        value={values.departmentId}
                        onBlur={handleBlur}
                      >
                        {employeeReducer.department.map((item) => (
                          <option
                            key={item.id}
                            style={{
                              color: 'rgb(75, 174, 226)',
                              background: 'rgb(0, 5, 5)',
                              fontSize: '20px',
                            }}
                            value={item.id}
                          >
                            {item.name}
                          </option>
                        ))}
                      </Select>
                      {errors.departmentId && touched.departmentId && (
                        <Text color="red.500"> {errors.departmentId}</Text>
                      )}
                    </FormControl>

                    <FormControl isRequired>
                      <MainFormLabel label="Role" />
                      <Select
                        name="roleId"
                        type="text"
                        borderColor="borderColor"
                        onChange={handleChange}
                        value={values.roleId}
                        onBlur={handleBlur}
                      >
                        {employeeReducer.role.map((item) => (
                          <option
                            key={item.id}
                            style={{
                              color: 'rgb(75, 174, 226)',
                              background: 'rgb(0, 5, 5)',
                              fontSize: '20px',
                            }}
                            value={item.id}
                          >
                            {item.name}
                          </option>
                        ))}
                      </Select>
                      {errors.roleId && touched.roleId && (
                        <Text color="red.500"> {errors.roleId}</Text>
                      )}
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

                <ModalFooter gap="2">
                  <RoundButton onClick={onClose}>Cancel</RoundButton>
                  <RoundButton
                    isLoading={isSubmitting}
                    theme="purple"
                    type="submit"
                    ml={3}
                    onClick={() => {}}
                  >
                    {formik.initialValues.id ? 'Save' : 'Create'}
                  </RoundButton>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

EditEmployee.propTypes = {
  employee: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

EditEmployee.defaultProps = {}

export default EditEmployee
