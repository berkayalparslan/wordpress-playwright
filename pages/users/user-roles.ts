export enum UserRoles {
    NONE = 0,
    Subscriber,
    Contributor,
    Author,
    Editor,
    Administrator
  }

export function getUserRoleName(userRole: UserRoles){
  switch (userRole) {
    case UserRoles.Administrator:
      return ("Administrator");
    case UserRoles.Author:
      return ("Author");
    case UserRoles.Contributor:
      return ("Contributor");
    case UserRoles.Editor:
      return ("Editor");
    case UserRoles.Subscriber:
      return ("Subscriber");
    default:
      throw new Error("Unknown user role");;
  }
}