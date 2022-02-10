# Covid-Central
Covid-Central

## User Stories
1. User should be able to visit webpage and see latest covid19 data
2. User is prompted to choose 1 of 2 categories (vaccinations or testings)
3. User is prompted to accept google location settings (yes/no) 
4. User is presented with nearby locations of the services category selected
5. User should be able to register/login
6. User should be able to see the history of queries/searches done on the website (stored in our database based on user_id) IF logged-in
7. User should be able to search in a search bar for nearby services by city/postal code (visual map)
8. User should get back results from search with nearby covid19 services (vaccinations, testing and ppe)
9. User should be able to get a link to redirect onto website that provides the service requested

**STRETCH USER Stories**
1. User should be able to register/login (with phone number)
2. QR code to text to your number with appointment data
3. 3rd category is e-commerce (amazon for PPE, covid tests, etc)

### Project Git Workflow
NEVER code on Main!

**Create Feature Branches** 
git checkout -b feature/my-feature

**Main branch is your production branch, never directly work on it!**

**Starting a new branch**
1. git checkout main (Start new branches from the main branch)
2. git pull (Make sure you have the most recent version)

**Working on the branch** 
3. git checkout feature/my-feature (Make your feature) 
4. git add & git commit (Commit often with meaningful messages !) 
5. git push (So it's not only local)

**Merging main in the BRANCH**
6. git checkout main (To update it)
7. git pull 
8. git checkout feature/my-feature (Back to your feature) 
9. git merge main 
10. Fix conflicts if any 
11. git commit (commit the merge) 
12. git push (So it's not only local)

**Merging the branch back in MAIN** 
13. git checkout main (To merge your branch) 
14. git merge feature/my-feature 
15. Should not be any conflict since you cleaned them in the branch first 
16. git commit (commit the merge) 
17. git push (So it's not only local)
