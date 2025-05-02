import { algoliasearch } from 'algoliasearch';

 const client = algoliasearch('ER7KTK9CBD', '5a052a167d678c5293ff3a3c31ed5866');

// Fetch and index objects in Algolia
// export const processRecords = async () => {
//   const datasetRequest = await fetch('https://backend-five-lyart-36.vercel.app/destination');
//   const destinations = await datasetRequest.json();
//   return await client.saveObjects({ indexName: 'destinations_index', objects: destinations });
// };

export const processRecords = async () => {
    const datasetRequest = await fetch('https://backend-five-lyart-36.vercel.app/destination');
    const destinations = await datasetRequest.json();

    // console.log({
    //   destinations,
    // });
    
  
    // Ensure each object has an objectID
    const formattedDestinations = destinations?.destinations?.map((destination, index) => ({
      ...destination,
      objectID: destination.id || index,  // Make sure to use a unique identifier
    }));

    // console.log({
    //   formattedDestinations,
    // });
    
  
    // Now save the formatted objects to Algolia
    // return await client.saveObjects(formattedDestinations);
    return await client.saveObjects( { indexName: 'destinations_index', objects: formattedDestinations });
  };
  

processRecords()
  .then(() => console.log('Successfully indexed objects!'))
  .catch((err) => console.error("hey", err));