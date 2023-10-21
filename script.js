let course = function(courseName, allcourses){
    let _courseName = courseName;
    let _Nextcourses = [];
    let stackNum=1;
    for (let i = 0; i < allcourses.length; i++) {
        if(allcourses[i].prerequisites.includes(courseName)){
            let newCourse = course(
                    allcourses[i].course_code, allcourses);
            _Nextcourses.push( newCourse
                );
            stackNum = newCourse.stackNum > _Nextcourses.length ? newCourse.stackNum : _Nextcourses.length;
        }

    }


    return { _courseName, _Nextcourses, stackNum}
}


async function courses(){
let file = await fetch('./courses.json');
let json = await file.json();
let coursesArr = json.courses;
let rootCoursesArr =[]

for(let i=0; i< coursesArr.length; i++){
    if(coursesArr[i].prerequisites.length == 0){
       rootCoursesArr.push(course(
        coursesArr[i].course_code, coursesArr
       )) 
    }
}

let addNextCourse = function(root,rootIndex,index, currentCourse){
    let courseRect = root.clone();
    courseRect.translate(130*(1+rootIndex), index *50);
    courseRect.attr('label/text', currentCourse._courseName);
    courseRect.addTo(graph);
    let arrow = new joint.shapes.standard.Link();
    arrow.source(root);
    arrow.target(courseRect);
    arrow.addTo(graph);

    for(let i = 0; i< currentCourse._Nextcourses.length; i++){
        addNextCourse(courseRect,0, i, currentCourse._Nextcourses[i]);

    }
}

for(let i=0; i < rootCoursesArr.length; i++){

    let rectan = new joint.shapes.standard.Rectangle();
    rectan.position(10 , i*50);
    rectan.resize(100, 40);
    rectan.attr({
        body: {
            fill: 'blue'
        },
        label: {
            text: rootCoursesArr[i]._courseName,
            fill: 'white'
        }
    });
    rectan.addTo(graph);
    for(let j= 0; j< rootCoursesArr[i]._Nextcourses.length; j++){
        addNextCourse(rectan, i,j, rootCoursesArr[i]._Nextcourses[j])
    }
}

 


}
courses();
