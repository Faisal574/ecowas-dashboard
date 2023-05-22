const urls = [
  "http://ecowasbackend-env.eba-hvykxkzm.eu-west-1.elasticbeanstalk.com/",
  "https://sankey.pakexports.pk/",
  "http://192.168.18.158:5000/",
];

export const baseUrl = urls[1];

export const getEnergyEndpoint = baseUrl + "energybalance/";
export const getEmissionEndpoint = baseUrl + "emission/";
export const getCountriesEndpoint = baseUrl + "countries";
export const flagEndpoint = baseUrl + "flags/";
export const signInEndpoint = baseUrl + "auth";
export const nodesEndpoint = baseUrl + "nodes/";
