# cancan.io - the projects app

## Overview
cancan is a kanban tool to track the progress of projects, similar to Trello. Each 'Board' can hold an unlimited number of 'Big Steps', within which there are an unlimited number of 'Baby Steps'. As a user, you can track your Big and Baby step progress from 'planned', to 'in progress' and finally to 'complete' with your teammates, assigning responsibility of each project stage.

This project was completed as part of my Software Engineering Immersive programme with General Assembly.

In my planning materials, I laid out the following MVP and Icebox functionality:

<br>

### Minimum Viable Product
As a user, I want to be able to:
<ul>
    <li>Login to see my project boards
    <li>Create a board for my project
    <li>Add ‘big steps’ to my board
    <li>See a visualisation of the stage of my ‘big steps’ on its board
    <li>Update the description or status of a ‘big step’
    <li>Delete a ‘big step’ from my board
    <li>Delete a board that I own
</ul>
<br>

### Icebox
As a user, I want to be able to:
<ul>
    <li>Add ‘baby steps’ to my ‘big steps’ (each big step will also be a kanban)
    <li>See a visualisation of the stage of my ‘baby steps’ on its board
    <li>See all steps automatically move up the completion flow when all associated tasks are complete
    <li>Assign ownership and control admin rights to ‘big steps’
    <li>Assign ownership and control admin rights to baby steps’
    <li>Access a team dashboard to show information about step status, both big and small
    <li>Access a personal dashboard to show information about step status, both big and small
    <li>Access a to-do list
    <li>See big step deadlines allocated to my board in my Google calendar.
</ul>

 <br>
 <br>

## Deployment Link
<a href="https://cancan.herokuapp.com/" target="blank">cancan.herokuapp.com</a>
 
<br>
<br>

## Getting Started
To start using Cancan, follow these steps: 
<ol>
    <li>Follow <a href="https://cancan.herokuapp.com/" target="blank">this link</a> and sign up with an email address and password.</li>
    <li>Click on the 'new board' button to show the NewBoardPage page.</li>
    <li>Enter a name, description, due date and assign admins. Click 'Create Board'</li>
    <li>In your new Board, use the '+' icon to open the AddBigStepPage page.</li>
    <li>Enter a name, description, due date and assign responsibility. Click 'Add Big Step'</li>
    <li>From your board page, you now have the following options on the Big Step:</li>
        <ul>
            <li>Click the pen icon to edit the Big Step</li>
            <li>click the '?' icon to open the Big Step and add a Baby Step</li>
            <li>Click the trash icon to delete the Big Step</li>
            <li>Click the right arrow to move the Big Step up the kanban</li>
        </ul>
</ol>

On the my boards page, you will see that the completion rate of projects is shown when hovered over with your mouse.


Alternatively, you can log in with the following credentials:

<br>
<ul>
    <li>User: guest@guest.com
    <br>
    <li>Pass: guest
 </ul>

I am currently using cancan to track development pipelines across all my current projects.

<br>
<br>

## Timeframe & Working Team
This was a solo project. We had 7 working days to complete this project, and I worked over weekend and a public holiday to bring it up to 10 solid days of work.

<br>
<br>

## Technologies Used
During this project I used the MERN Stack and Heroku for deployment:
 * MongoDB/Mongoose
 * Express
 * React.js
 * Node.js

It was my first time using React JS, and second time using the rest of the MEN stack.

 <br>
 <br>

## Brief
We were issued the following brief from our instructors:
<br>

### Application Technical Requirements/Deliverables

- A **working** full-stack, single-page application hosted on Heroku.

- Incorporate the technologies of the **MERN-stack**:
	- MongoDB/Mongoose
	- Express
	- React
	- Node

- **Have a well-styled interactive front-end** that communicates with the **Express** backend.

- Implement token-based **authentication**.  Including the ability of a user to sign-up, log in & log out.

- Implement **authorisation** by restricting CUD data functionality to appropriately authenticated users. Also, navigation should respond to the login status of the user.

- **Have a comprehensive feature-set**. For example, **if the app does not include full-CRUD** data operations, **ensure the addition** of one or more of the following:
	
	- Consume a third-party API.
	- Utilize multi-user, real-time communications.
	- Include _admin_ features.

 <br>
 <br>

## Planning
Please find the planning documents that I submitted to my tutors below:
 * [Planning Materials](https://docs.google.com/document/d/1qlpGrrd2ngbnR7gZY-alhr5ifHr5hTlYXAbCOV9TGVs/edit#) 
 * [Trello](https://trello.com/b/W6WazhrX/project-4) 

<br>
<br>

## Build Process
I did my best to follow a step-by-step principal when designing this app: model -> testing interface -> routes -> controllers. 

I took the following steps during the project:
<ol>
    <li>Deployed MERN Stack Infrastructure
    <li>Built Board and BigStep models
    <li>Designed basic interface for 'my boards' page, including BoardsList component for testing
    <li>Completed full CRUD on 'Board' model following RESTFUL conventions
    <li>Implemented Back end authorisations on 'Board' model
    <li>Refactored 'Board' model to nest 'BigStep' model
    <li>Designed basic styling for 'my boards' page and relevant components
    <li>Designed basic styling for BoardPage page and relevant BigStep components
    <li>Completed full CRUD on 'Big Step' model following RESTFUL conventions
    <li>Added nested 'BabyStep' model to 'Board' model
    <li>Designed basic styling for relevant 'BabyStep' pages and components
    <li>Completed full CRUD on Baby Step model following RESTFUL conventions
    <li>Added 'Total Complete' virtual to Board model and created the BoardCard to facilitate the OnMouseOver functionality
    <li>Implemented back end authorisations for 'Big Step' and 'Baby Step' models
</ol>

Please note that this is not an exhaustive list of steps taken; please review my GitHub Repo for detailed commits.

Having outlined the overall process above, I will highlight some of the aspects of developing this app that I am most proud of:

<br>
<br>

### Error Handling
This was the first time that I had really focussed on handling errors within an app, and found satisfaction in thinking through all the eventualities that might arise in writing to the database.

The code below demonstrates the approach that I was taking towards the end of developing the app. 

```JavaScript
async function create(req, res) {
  const newBabyStep = req.body.newBabyStep
  const boardId = req.params.boardId
  const bigStepId = req.params.bigStepId

  const board = await Board.findById(boardId)
  const boardAdmins = board.admins
  const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId)
  const bigStepResponsible = bigStep.responsible

  const verifiedEditors = [...boardAdmins, bigStepResponsible]

  const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if (verifiedAdmin) {
    try {
      if (!board) {
        return res.status(404).json({ message: 'Board not found' })
      }
      const bigStep = board.bigSteps.find(bStep => bStep._id.toString() === bigStepId)

      if (!bigStep) {
        return res.status(404).json({ message: 'Big step not found' })
      }
    
      bigStep.babySteps.push(newBabyStep);
      const updatedBoard = await board.save();
      res.status(200).json(updatedBoard)     

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error' })
    }

  } else {
    res.status(403).json({ error: "Only the administrator of a Board can add a Big Step" })
  }
}
```

Please note that this approach to error handling was iterative, and I need to implement it across the controller functions. Additionally, functionality needs to be added to the front end to alert users to errors. Both of these improvements are in my development pipeline.

<br>
<br>

### URI Formatting
When considering how to present the URI I wanted to use the Board and Big Step titles to help users locate themselves within the app. Whilst this feature only leads to a marginal improvement in the user experience, it's this kind of attention to detail that I find really makes an app feel clean and well designed. 

In order to implement this I first had to check that the Board title was unique in the controller function:
```JavaScript
async function create(req, res) {
  newBoard = req.body.board

  const existingBoard = await Board.find({title: newBoard.title})
  
  if (existingBoard.length > 0) {
      return res.status(400).json({ error: 'A Board with this title already exists' })
      
    } else {
        const board = await Board.create(newBoard)
        res.status(200).json(board)
    }
}
```
<br>

Next, I had to navigate users to a URI where the spaces in the board title were replaced with hyphens:
```JavaScript
async function handleCreateBoard(evt) {
    evt.preventDefault()
    const boardData = {...newBoard, author: user._id, admins: selectedAdmins}
    const createdBoard = await boardsAPI.createBoard(boardData)
    setBoards([...boards, createdBoard])
    setNewBoard({ title: "", description: "", admins: [], users: [] })
    setSelectedAdmins([])
    navigate(`/boards/${boardData.title.replace(/\s+/g, '-')}`)
  }
```

<br>

Finally, from the relevant Board components I had to replace the hyphens with spaces to get the original title in order to call the database for the document:

```JavaScript
export default function BoardPage({user}) {
    const { boardName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''
    
    const [board, setBoard] = useState({})
    

    useEffect(function() {
        async function getBoard() {
            const board = await boardsAPI.getUserBoard(boardNameActual)
          setBoard(board)
        }
        getBoard()

    }, [boardNameActual, setBoard])
```
Please note that I am aware that there are conflicting conventions between using 'board name' and 'board title' employed in my code - updating this is in my development pipeline.
<br>

Currently, the board title is checked for uniqueness at a global level which, in a widely used application, would be a major limiting factor. It is in my current development pipeline to introduce a username into the sign-up process, include the username in the URI and to ensure that any validation of board titles is checked against the individual user and their associated board admin responsibilities only. Additionally, my app struggles with handling special characters; I do not want to remove a user's ability to use these in titles so I will need to work on encoding these correctly when writing to MongoDB - this is also in my development pipeline.

<br>
<br>

### OnMouseOver functionality on the BoardCard component
One of the features that I think makes cancan feel like a professional and slick application is the OnMouseOver functionality on the BoardCard components, displayed on the 'my boards' page. By hovering over the BoardCard component users can see completion rate of the board.

Implementing this required quite a lot of code refactoring. I extracted the board information from the BoardsList components (Author & User) and created a BoardCard component in which I was able to introduce the onMouseOver and onMouseOut functionality: 
```JavaScript
export default function BoardCard({ board, onDeleteClick }) {
  const [hoveredTitle, setHoveredTitle] = useState(null);
  const [hoveredDescription, setHoveredDescription] = useState(null);

  return (
    <div
      className="card-body-board-card-container"
      onMouseOver={() => {
        setHoveredTitle(board.totalBigSteps);
        setHoveredDescription('% complete');
      }}
      onMouseOut={() => {
        setHoveredTitle(null);
        setHoveredDescription(null);
      }}
    >
...
```

<br>

It also required that I added a virtual property to my Board model to calculate current rate of completion:
```JavaScript
boardSchema.virtual('totalComplete').get(function() {
    let bigStepCount = 0;
    this.bigSteps.forEach(bigStep => {
      if (bigStep.status === 'Complete') {
        bigStepCount++
      }
    })
    let totalComplete = (bigStepCount / this.bigSteps.length) * 100

    } else {
      return totalComplete
    }
  })
```

I intend to improve the variety of information presented on the OnMouseOver feature, and to improve the logic in calculating the completion rate (currently it only divides complete Big Steps by total Big Steps). Both of these improvements are currently in my development pipeline.


<br>
<br>

## Challenges
### Model Design
I started the development of cancan by building the models as per my planned ERD (see page 6 of my <a href="https://docs.google.com/document/d/1qlpGrrd2ngbnR7gZY-alhr5ifHr5hTlYXAbCOV9TGVs">planning materials</a>).

Having successfully completed full CRUD functionality on the board model I re-considered my approach to data relationships, concluding that a 'Big Step' could not exist detached from a Board and thus it should be a nested relationship.

This was really a rookie error, and one I would be determined not to make again.

<br>
<br>

### State & Hooks
It took me a while to really get my head around how state works, and how to determine state through the use of hooks. I feel that, at the end of this project, I was much more comfortable with handling React and manipulating it in the way that I wanted.
<br>
<br>



## Wins
### Styling
Overall I was happy with the styling of  the app, in particular how close it came to the wireframes that I had put together in my planning materials. I was satisfied that I was able to design a front-end to specification, even though it is not yet responsive - something that is in my development pipeline.

To compare the final app to my wireframes, please see pages 2-5 of my <a href="https://docs.google.com/document/d/1qlpGrrd2ngbnR7gZY-alhr5ifHr5hTlYXAbCOV9TGVs/">planning materials</a>.
<br>
<br>

### Multi-User Authorisation
Whilst there is still some final tightening of back-end authorisations and implementation of front-end authorisations and error handling to be made, I am happy that I was able to lay a good groundwork for implementing multi-user functionality for this app. I have a relatively straightforward roadmap to having multiple administrative authorisations implemented throughout the application captured in my development pipeline. I also hope to introduce teams into the app, whereby users will be able to invite team members and find only those team members in the list of users who can be assigned responsibility for tasks in their Board, Big Steps and Baby Steps. 

## Key Takeaways
I have several key takeaways from this project:
<ul>
    <li>Ensure that data relationships are planned correctly in advance of commencing development
    <li>Build apps with a Mobile-First Design, especially when you are expecting users to interact with the app on the go
    <li>Always follow RESTful conventions - I had to spend some time refactoring code which did not follow these conventions
</ul>
<br>
<br>


## Bugs & Future Improvements
You can find a live tracker of my bug and improvement pipeline on cancan itself: <a href="https://cancan.herokuapp.com" target="blank">cancan.herokuapp.com</a>

Use the following credentials to log in to the app and navigate to "my boards", and visit the "cancan" board:
<br>

<ul>
    <li>User: guest@guest.com
<br>
    <li>Pass: guest
</ul>
 <br>
 <br>



