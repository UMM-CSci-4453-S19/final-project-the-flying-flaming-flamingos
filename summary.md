### WHAT (4 points)

> We will be implementing a genealogy website in which everyday people can sign up, create an account, and begin building their family tree. Users, which are the people who create accounts, can add people such as their parents to their family tree even if the parents are not registered in the site. A user would be able to search for family members via text search or manually add a member if they are not found using the search. Each user would have a profile which would display their information and family members. 

### WHO (5 points)

> We worked as a team for most of the project since there was only two of us in the group. We worked on things as they came along since we were still unsure how things would play out. The work was mostly split up by client and server side. Client side revolved around setting up the webpages while server side revolved around getting queries to run as well as the webpage routing. We began working with understading how to integrate neo4J. We ended up using neo4J driver bolt package to make connecting with javascript easier. From there we worked on understanding how to get queries working and how to get useful information from objects that were returned. The last thing was getting pages to work together which is the routing.

### Structure

> We had two types of node labels, user and person. We planned on using gedcom which are standarized specifications for genealogical data. However we did not have the time to fully understand or get them to work with our project so we created our own structure.

> User Nodes: user nodes are nodes for people using our website. Each user node has an email and password properties. These user nodes would then be connected to a person node with an edge that would specify an isPerson relationship.

> Person Nodes: person nodes are for people in trees. A person node does not necessarily have an account as a user could have entered them in manually. Person nodes connect to each other if there is a relationship specifying isParent.


### Final Summary


#### What Worked

> Sign up
> 
> We were able to get a functional sign up and login. When users create an account, our signup function first checks if the passwords entered are the same. If they are, the function runs a query that checks to see if there is already a user node with the entered email. If there is a user with that email, an alert informs the user that the email they have entered is already in the system. If there is no user with that email, another query runs that creates a user node with the email and password entered. We do not hash passwords and put a disclaimer on our site so users know.

> Log in
> 
> We were able to get our login function to work. The function ran a query to see match the email and password entered. If it does not find a user node with the email and password entered it alerts the user saying that no user with that email has been found. If a user node with the entered email exists, it checks to see if the password entered matches the password in that user node. If it does they are allowed to sign in and taken to their profile page. If it does not match then the user is alerted that the passwords do not match.

> Match Person
> 
> Our match person function worked as well. When a user is filling out their personal information such as first name, last name, etc... they have an option to search if they are already in a tree, meaning there is a person node associated with the user. The match function runs a query that takes in the first name entered, last name entered, and gender. It searched person nodes to see if any match with that given information. If there are matches, they are returned as a list so the user can choose which one is them. If there are no person nodes found with that information, then we no there is no person node associated with that user.

>Link Person
>
> Our link person function worked as well. If a user did not find a person node with their information, an 'add yourself to a tree' button would then get the user node, which is yours, and create a person node with a relationship linking that user and person nodes with an isPerson relationship. We had a bug that was fixed but did not push before the presentation.

#### What Didn't Work

> We were unable to get a list to be returned when matches were found. It is not so much as a did not work so much as it was that we did not have enough time to implement. The match function does return a list to our javascript but we do not do anything with it in the html to display it. Our search for family members did also not work. We did not have time to implement this as well as adding them to your tree by creating a relationship. This would be a future addition.

#### Future Additions

> For future additions, we were interested in using gedcoms as the way of having families. In that structure, families have a node and members of that family have relationships to that family node specifying their 'role' in the family, such as wife, husband child, instead of having all nodes in the same database. If we were to go this route, implementing more relationships would be useful such a biological parents, legal parents etc... As of now we do not display the database or families in a grpahical way. A great addition to this project would be to implement the graph view in the users profile page instead of having links to view their family members page. It goes without saying that encrypting paswords would also be something good to implement in the future.


At this point we were planning on using MySQL and this below is how we were planning on setting up tables. We decided to move over to Neo4J since its structure worked best with our project.
[Outline of tables](https://docs.google.com/document/d/1hLENiZwB4PbiLzfF-psUiQP6Exkq6a3mRG-93AOjtUc/edit)
