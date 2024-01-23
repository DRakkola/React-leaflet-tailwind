import { ResponsiveLine } from "@nivo/line";

const ChartLine = ({ data }) => {
   if (!data){
      data = [
         {
           "id": "locations",    
           "data": [
             { "x": "01", "y": 50 },
             { "x": "02", "y": 65 },
             { "x": "03", "y": 72 },
             { "x": "04", "y": 48 },
             { "x": "05", "y": 60 },
             { "x": "06", "y": 55 },
             { "x": "07", "y": 70 },
             { "x": "08", "y": 85 },
             { "x": "09", "y": 92 },
             { "x": "10", "y": 78 },
             { "x": "11", "y": 63 },
             { "x": "12", "y": 45 },
             { "x": "13", "y": 50 },
             { "x": "14", "y": 68 },
             { "x": "15", "y": 75 },
             { "x": "16", "y": 80 },
             { "x": "17", "y": 62 },
             { "x": "18", "y": 58 },
             { "x": "19", "y": 55 },
             { "x": "20", "y": 70 },
             { "x": "21", "y": 75 },
             { "x": "22", "y": 80 },
             { "x": "23", "y": 92 },
             { "x": "24", "y": 68 },
             { "x": "25", "y": 75 },
             { "x": "26", "y": 80 },
             { "x": "27", "y": 62 },
             { "x": "28", "y": 58 },
             { "x": "29", "y": 55 },
             { "x": "30", "y": 70 },
             { "x": "31", "y": 75 }
           ]
         },
         {
           "id": "Pictures",  
           "data": [
             { "x": "01", "y": 30 },
             { "x": "02", "y": 45 },
             { "x": "03", "y": 55 },
             { "x": "04", "y": 35 },
             { "x": "05", "y": 40 },
             { "x": "06", "y": 50 },
             { "x": "07", "y": 25 },
             { "x": "08", "y": 30 },
             { "x": "09", "y": 28 },
             { "x": "10", "y": 42 },
             { "x": "11", "y": 55 },
             { "x": "12", "y": 60 },
             { "x": "13", "y": 65 },
             { "x": "14", "y": 40 },
             { "x": "15", "y": 35 },
             { "x": "16", "y": 45 },
             { "x": "17", "y": 50 },
             { "x": "18", "y": 38 },
             { "x": "19", "y": 30 },
             { "x": "20", "y": 25 },
             { "x": "21", "y": 20 },
             { "x": "22", "y": 22 },
             { "x": "23", "y": 28 },
             { "x": "24", "y": 30 },
             { "x": "25", "y": 35 },
             { "x": "26", "y": 40 },
             { "x": "27", "y": 45 },
             { "x": "28", "y": 50 },
             { "x": "29", "y": 38 },
             { "x": "30", "y": 30 },
             { "x": "31", "y": 25 }
           ]
         }
       ]
       
   } 
return(
    <div className="bg-white rounded-sm shadow-md w-full h-full p-4 m-4">
        <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        colors={[
         '#3081D0',
         '#EEC759'
       ]}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'date',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor',
        modifiers: [
         [
           'darker',
           0.3
         ]
       ] }}
        pointLabelYOffset={-12}
        enableArea={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    </div>
   
)
}

export default ChartLine;