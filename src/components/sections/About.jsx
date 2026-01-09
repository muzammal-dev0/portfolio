import { personalInfo } from "../../constants/personalInfo";
import { workExperience } from "../../constants/experience";
import {
  frontendSkills,
  backendSkills,
  databaseSkills,
  versionControlSkills,
  cloudDeploymentSkills,
  testingSkills,
  projectManagementSkills,
} from "../../constants/skills";

const About = () => {
  // Organize ALL skills by category for Dev Stack (matching Skills section)
  const devStackCategories = [
    {
      title: "Frontend",
      skills: frontendSkills, // All frontend skills
    },
    {
      title: "Backend",
      skills: backendSkills, // All backend skills
    },
    {
      title: "Database",
      skills: databaseSkills, // All database skills
    },
    {
      title: "Version Control & Collaboration",
      skills: versionControlSkills, // All version control skills
    },
    {
      title: "Cloud and Deployment",
      skills: cloudDeploymentSkills, // All cloud & deployment skills
    },
    {
      title: "Testing & Code Quality",
      skills: testingSkills, // All testing skills
    },
    {
      title: "Project Management & Collaboration",
      skills: projectManagementSkills, // All project management skills
    },
  ].filter((category) => category.skills.length > 0);

  // Format date to show month name and year (format: DD/MM/YYYY -> Month Year)
  const formatDate = (dateString) => {
    if (dateString === "CURRENT") return "Current";
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parts[2];
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `${monthNames[month - 1]} ${year}`;
    }
    return dateString;
  };

  // Remove "ASSOCIATE" from position title
  const formatPosition = (position) => {
    return position.replace(/ASSOCIATE\s+/i, "").trim();
  };

  return (
    <section id="about" className="py-20 bg-[#5F9B8C]">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-white leading-tight">
            A little bit about me
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Text Content and Work Experience */}
          <div className="lg:w-1/2 space-y-12">
            <div className="space-y-6 text-lg md:text-xl lg:text-2xl text-white leading-relaxed">
              <p>{personalInfo.bio.long[0]}</p>
              <p>{personalInfo.bio.long[1]}</p>
            </div>

            {/* Work Experience */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Work Experience
              </h3>
              <div className="space-y-4">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="text-gray-800">
                    <p className="text-lg md:text-xl font-semibold">
                      {formatPosition(exp.position)}
                    </p>
                    <p className="text-base md:text-lg text-gray-700">
                      at {exp.company}
                    </p>
                    <p className="text-sm md:text-base text-gray-600">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Dev Stack Cards by Category */}
          <div className="lg:w-1/2">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Dev Stack
            </h3>
            <div className="space-y-8">
              {devStackCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-4">
                  <h4 className="text-xl md:text-2xl font-bold text-white border-b-2 border-white/30 pb-2">
                    {category.title}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="relative bg-white rounded-lg px-4 py-3 shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                      >
                        <div className="flex items-center justify-center gap-2 relative z-10">
                          {skill.iconUrl ? (
                            <>
                              <img
                                src={skill.iconUrl}
                                alt={skill.title}
                                className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  if (e.target.nextElementSibling) {
                                    e.target.nextElementSibling.style.display =
                                      "inline";
                                  }
                                }}
                              />
                              <i
                                className={`${skill.icon} ${
                                  skill.iconColor || "text-gray-600"
                                } text-lg md:text-xl flex-shrink-0`}
                                style={{ display: "none" }}
                              ></i>
                            </>
                          ) : (
                            <i
                              className={`${skill.icon} ${
                                skill.iconColor || "text-gray-600"
                              } text-lg md:text-xl flex-shrink-0`}
                            ></i>
                          )}
                          <h3 className="text-xs md:text-sm font-semibold text-gray-800">
                            {skill.title}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
