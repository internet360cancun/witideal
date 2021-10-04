import {
  lowAtt,
  midAtt,
  hiAtt,
  rangeMatchAtt,
  eqMatch,
  intervalMatch,
} from "../assets/Strings";

export function addWeight(casas, form) {
  casas.forEach((prop) => {
    let propertyData = prop.specificData;
    let points = 9;
    let maxPosiblePoints = 9; // to divide point/maxPosiblePoint

    if (propertyData !== undefined) {
      Object.keys(form).forEach((key) => {
        if (hiAtt.includes(key)) {
          //+3points

          console.log("KEY: ", key);
          maxPosiblePoints += 3;
          if (rangeMatchAtt.includes(key)) {
            //get the range matches
            if (
              propertyData[key] >= form[key] &&
              propertyData[key] !== undefined
            ) {
              // console.log(`${key}+3p`, propertyData[key])
              points += 3;
            }
          } else if (eqMatch.includes(key)) {
            //get the equality matches
            if (
              propertyData[key] === form[key] &&
              propertyData[key] !== undefined
            ) {
              // console.log(`${key}+3p`, propertyData[key])
              points += 3;
            }
          } else if (intervalMatch.includes(key)) {
            //get the interval matches
            if (
              parseInt(form[key][0]) <= parseInt(propertyData[key]) &&
              parseInt(propertyData[key]) <= parseInt(form[key][1]) &&
              propertyData[key] !== undefined
            ) {
              // console.log(`${key}+3p`, propertyData[key])
              points += 3;
            }
            // else if((parseInt(form[key][0])<=propertyData[key]) && propertyData[key]!==undefined){

            //     points +=3
            // }
          }
        } else if (midAtt.includes(key)) {
          //+2points
          maxPosiblePoints += 2;
          if (rangeMatchAtt.includes(key)) {
            //get the range matches
            // console.log("Entro")
            if (
              propertyData[key] >= form[key] &&
              propertyData[key] !== undefined
            ) {
              // console.log(`${key}+2p`, propertyData[key])
              points += 2;
            }
          } else if (eqMatch.includes(key)) {
            //get the equality matches
            if (
              propertyData[key] === form[key] &&
              propertyData[key] !== undefined
            ) {
              // console.log(`${key}+2p`, propertyData[key])
              points += 2;
            }
          } else if (intervalMatch.includes(key)) {
            //get the interval matches

            if (
              parseInt(form[key][0]) <= parseInt(propertyData[key]) &&
              parseInt(propertyData[key]) <= parseInt(form[key][1]) &&
              propertyData[key] !== undefined
            ) {
              console.log(
                "----------------------------------------------------------------------------------------"
              );
              console.log(
                parseInt(form[key][0]) <= propertyData[key] &&
                  propertyData[key] <= parseInt(form[key][1])
              );
              //   console.log(`${key}+2p`, propertyData[key])
              points += 2;
            }
          }
        } else if (lowAtt.includes(key)) {
          //+1point
          maxPosiblePoints += 1;
          if (rangeMatchAtt.includes(key)) {
            //get the range matches
            if (
              propertyData[key] >= form[key] &&
              propertyData[key] !== undefined
            ) {
              // console.log(`${key}+1p`, propertyData[key])
              points += 1;
            }
          } else if (eqMatch.includes(key)) {
            //get the equality matches
            if (
              propertyData[key] === form[key] &&
              propertyData[key] !== undefined
            ) {
              // console.log(`${key}+1p`, propertyData[key])
              points += 1;
            }
          } else if (intervalMatch.includes(key)) {
            //get the interval matches

            if (
              parseInt(form[key][0]) <= parseInt(propertyData[key]) &&
              parseInt(propertyData[key]) <= parseInt(form[key][1]) &&
              propertyData[key] !== undefined
            ) {
              points += 1;
            }
          }
        }
      });
    } else {
      //Property with no specific data
      Object.keys(form).forEach((key) => {
        if (hiAtt.includes(key)) {
          //+3points
          maxPosiblePoints += 3;
        } else if (midAtt.includes(key)) {
          //+2points
          maxPosiblePoints += 2;
        } else if (lowAtt.includes(key)) {
          //+1point
          maxPosiblePoints += 1;
        }
      });
    }
    prop.points = points;

    prop.coincidence = Math.round((points / maxPosiblePoints) * 100);
  });
  return casas;
}
