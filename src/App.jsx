import * as d3 from 'd3';
import { Box, Button } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import './styles.css';

const addHingePaths = (svg) => {
  svg
    .append('path')
    .attr('x', 35)
    .attr('transform', 'translate(32, 32)')
    .classed('rotate', true)
    .attr('d', 'M42 59.144V41H23.772H0L42 83V59.144Z')
    .attr('fill', 'red');

  svg
    .append('path')
    .attr('transform', 'translate(32, 32)')
    .attr('d', 'M41 23.856V42H59.312H83L41 0V23.856Z')
    .attr('fill', 'red')
    .classed('rotate', true);

  svg
    .append('path')
    .attr('transform', 'translate(32, 32)')
    .classed('rotate', true)

    .attr(
      'd',
      'M58.5618 41.3997H41.3741V58.9996C41.3741 49.2845 49.0742 41.3997 58.5618 41.3997Z'
    )
    .attr('fill', 'red');
  svg
    .append('path')
    .attr('transform', 'translate(32, 32)')
    .classed('rotate', true)

    .attr(
      'd',
      'M24.1873 41.3997H41.375V23.7998C41.375 33.5149 33.6749 41.3997 24.1873 41.3997Z'
    )
    .attr('fill', 'red');
};

const Circle = () => {
  const ref = useRef();
  const [selected, setSelected] = useState(false);
  React.useEffect(() => {
    const svg = d3.select(ref.current);
    //Create line element inside SVG

    svg
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 50)
      .attr('height', 50)
      .attr('rx', 25)
      .on('click', (e) => {
        setSelected((s) => !s);
      });
  }, []);
  return (
    <Box position="relative">
      <svg ref={ref} />

      {selected && (
        <>
          {/* <Modal>
            <Box
              display="flex"
              flexDirection="column"
              gap="16px"
              position="absolute"
              zIndex="1"
              top="50"
              left="15"
              backgroundColor="secondary"
              p="6"
              borderRadius="5"
              opacity=".8"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <FormLabel>
                Height:
                <SizeInput
                  onChange={(newValue) => {
                    setSize({ ...size, height: newValue });
                    setExportSize({
                      ...exportSize,
                      height: exportSize.height + (newValue - size.height),
                    });
                  }}
                  defaultValue={size.height}
                ></SizeInput>
              </FormLabel>
              <FormLabel>
                Width:
                <SizeInput
                  onChange={(newValue) => {
                    setSize({ ...size, width: newValue });
                    setExportSize({
                      ...exportSize,
                      width: exportSize.width + (newValue - size.width),
                    });
                  }}
                  defaultValue={size.width}
                ></SizeInput>
              </FormLabel>
              <Button
                onClick={() =>
                  exportBlock('svg', rootBlockRef, rootBlock, exportSize)
                }
              >
                Export Block as Svg
              </Button>
            </Box>
          </Modal> */}

          <Box
            position="absolute"
            left={35}
            top={0}
            color={'primary'}
            backgroundColor="primary"
            w="15px"
            h="15px"
            borderRadius="100px"
            cursor="pointer"
            as={Button}
            onClick={() => {
              const svg = d3.select(ref.current);

              addHingePaths(svg);

              // setHingeActivated({ ...hingeActivated, topRight: true });
              // setExportSize({
              //   width: exportSize.width + 50,
              //   height: exportSize.height + 50,
              // });
            }}
          ></Box>

          <Box
            position="absolute"
            top={0}
            color={'primary'}
            backgroundColor="primary"
            w="15px"
            h="15px"
            borderRadius="100px"
            cursor="pointer"
            as={Button}
            onClick={() => {
              // setHingeActivated({ ...hingeActivated, topLeft: true });
              // setExportSize({
              //   width: exportSize.width + 50,
              //   height: exportSize.height + 50,
              // });
            }}
          ></Box>

          <Box
            position="absolute"
            left={35}
            top={35}
            color={'primary'}
            backgroundColor="primary"
            w="15px"
            h="15px"
            borderRadius="100px"
            cursor="pointer"
            as={Button}
            onClick={() => {
              // setHingeActivated({ ...hingeActivated, bottomRight: true });
              // setExportSize({
              //   width: exportSize.width + 50,
              //   height: exportSize.height + 50,
              // });
            }}
          ></Box>

          <Box
            position="absolute"
            left={0}
            top={35}
            color={'primary'}
            backgroundColor="primary"
            w="15px"
            h="15px"
            borderRadius="100px"
            cursor="pointer"
            as={Button}
            onClick={() => {
              // setHingeActivated({ ...hingeActivated, bottomLeft: true });
              // setExportSize({
              //   width: exportSize.width + 50,
              //   height: exportSize.height + 50,
              // });
            }}
          ></Box>
        </>
      )}
    </Box>
  );
};

export default function App() {
  return <Circle />;
}
