import React, { useState } from 'react';
import { Box, HStack, Button, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Spacer, Popover, PopoverTrigger, PopoverContent, useColorModeValue } from '@chakra-ui/react';
import { useLocation, Link } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function BreadcrumbBar() {
    const bg = useColorModeValue('white', 'gray.800'); // Light: white, Dark: gray.800
    const borderColor = useColorModeValue('gray.200', 'gray.800'); // Light: gray.200, Dark: gray.700
    const textColor = useColorModeValue('gray.800', 'white'); // Text color
  
    const location = useLocation();
    const [dateRange, setDateRange] = useState({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    });
  
    const formattedRange = `${format(dateRange.startDate, 'MMM dd, yyyy')} - ${format(dateRange.endDate, 'MMM dd, yyyy')}`;
  
    const getPathItems = () => {
      const paths = location.pathname.split('/').filter((x) => x);
      const pathMap = {
        '': 'Dashboard',
        'admin': '',
        information: 'Thông tin liên hệ',
        customers: 'Khách hàng',
        employees: 'Nhân viên',
        projects: 'Dự án',
        projecttypes: 'Loại dự án',
        cities: 'Tỉnh thành',
        tickets: 'Phiếu sở hữu căn hộ',
        profile: "Profile",
      };
  
      return paths.map((path, index) => ({
        name: pathMap[path] || path,
        link: `/${paths.slice(1, index + 1).join('/')}`,
      }));
    };
  
    const handleSelect = (ranges) => {
      setDateRange(ranges.selection);
    };
  
    const breadcrumbItems = getPathItems();

  return (
    <Box
      bg={bg}
      color={textColor}
      w="full"
      px={6}
      py={4}
      borderBottom="1px solid"
      borderColor={borderColor}
    >
      <HStack spacing={4}>
      <Breadcrumb spacing="8px" separator="›" fontWeight="medium" fontSize="sm">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbItems.map((item, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink as={Link} to={item.link}>
                {item.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <Spacer />
        <HStack spacing={2}>
          <Popover>
            <PopoverTrigger>
              <Button size="sm" variant="outline" colorScheme="gray">
                {formattedRange}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <DateRange
                ranges={[dateRange]}
                onChange={(ranges) => setDateRange(ranges.selection)}
                showSelectionPreview
                moveRangeOnFirstSelection={false}
                months={2}
                direction="horizontal"
              />
            </PopoverContent>
          </Popover>
          <Button size="sm" leftIcon={<FiFilter />} variant="outline">
            Filter
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
}

export default BreadcrumbBar;
