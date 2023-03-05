import React from 'react'
import { useTable, usePagination } from 'react-table'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
} from '@chakra-ui/react'
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@chakra-ui/icons'
import PropTypes from 'prop-types'

function CustomTable({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination,
  )

  // Render the UI for your table
  return (
    <VStack color={'white'}>
      <Table {...getTableProps()} mb="10px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index1) => (
                <Th
                  color={'whiteAlpha.700'}
                  key={index1}
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()} color="textColor">
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <Tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  return (
                    <Td textAlign="center" key={i} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>

      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              bg="secondaryBorderColor"
              borderRadius={'20px'}
              size="sm"
              _hover={{
                bg: 'primaryBlue',
                color: 'primaryBlack',
              }}
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              bg="secondaryBorderColor"
              borderRadius={'20px'}
              size="sm"
              _hover={{
                bg: 'primaryBlue',
                color: 'primaryBlack',
              }}
              mr={4}
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center" color={'whiteAlpha.700'}>
          <Text flexShrink="0" mr={8}>
            Page{' '}
            <Text fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>{' '}
            of{' '}
            <Text fontWeight="bold" as="span">
              {pageOptions.length}
            </Text>
          </Text>
          <Text flexShrink="0">Go to page:</Text>{' '}
          <NumberInput
            borderColor="secondaryBorderColor"
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={pageOptions.length}
            onChange={(value) => {
              const page = value ? value - 1 : 0
              gotoPage(page)
            }}
            defaultValue={pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper color={'whiteAlpha.700'} />
              <NumberDecrementStepper color={'whiteAlpha.700'} />
            </NumberInputStepper>
          </NumberInput>
          <Select
            borderColor="secondaryBorderColor"
            w={32}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option
                style={{
                  color: 'rgb(75, 174, 226)',
                  background: '#1E1E1E',
                  fontSize: '15px',
                }}
                key={pageSize}
                value={pageSize}
              >
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              bg="secondaryBorderColor"
              borderRadius={'20px'}
              size="sm"
              _hover={{
                bg: 'primaryBlue',
                color: 'primaryBlack',
              }}
              ml={4}
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              bg="secondaryBorderColor"
              borderRadius={'20px'}
              size="sm"
              _hover={{
                bg: 'primaryBlue',
                color: 'primaryBlack',
              }}
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </VStack>
  )
}

CustomTable.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.string.isRequired,
}

export default CustomTable
