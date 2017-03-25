# Summary & Conclusion

## Summary

Overall, the outcome of the project was successful. The author developed two systems with their
own matching compilers and virtual machines. The initial system was developed as an experiment,
to provide the author with practical knowledge on the subject, which he then applied into the
development of the final system. The system is able to compile Frank code and to run it in the
browser. Virtually all current Frank programs can be compiled and executed successfully by the
system; the overarching goal of the project was therefore effectively obtained. However,
due to time constraints, the final system is yet in prototype stages, as it does not support
all of Frank's features and contains a few fixable limitations, highlighted in the **Future work**
section.

During the course of the project, the author learned a variety of concepts. First of all,
he expanded his knowledge on functional programming by coding the compiler with Haskell
while utilizing various data types, such as monads. Secondly, the author was able to learn
the infrastructure, the functionality and the implementation of compilers and abstract machines
through research and participation in numerous discussions with his supervisor, Conor McBride.
The author also gained a greater insight into Bash script while creating the testing frameworks
for both systems and working on the project evaluation. Finally, the author learned the language
of Frank and the implementation of its defining qualities. 
 


## Future work

* Implement missing features, such as string concatenation;
* Improve the testing framework so that it show more statistics and uses timestamps;
* Expand the support for web features, such as HTTP request handling support or the handling
  of DOM updates;
* Improve the abstract machine's performance by storing stack frames in chunks, which would
  speed up searching and restoring stack, idea is based on "Proceedings of the 1st International
  Workshop on Type-Driven Development" [@Chunks1];
* Enforce JavaScript type definitions with Haskell structures, in order to decrease the risk of bugs;
* Increase compiler efficiency by updating pattern-matching procedures; building a tree of switches
  as described in "Functional Programming and Computer Architecture" [@Tree-switching];
* Improve building procedures;
* Further optimize the compiler and the abstract machine;


