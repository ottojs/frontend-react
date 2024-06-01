// Modules
import { DataUser } from "../types.ts";
import "./Avatar.css";

const ComponentAvatar = ({
  name_first,
  name_last,
  color,
  picture,
  picture_prefix,
}: DataUser) => {
  // Grab Initials
  const firstNameInitial = name_first ? name_first[0] : "";
  const lastNameInitial = name_last ? name_last[0] : "";

  return (
    <div className="d-flex justify-content-center mb-3">
      <div className="avatar-image">
        {picture ? (
          <img
            style={{ border: "5px solid " + (color || "#333333") }}
            src={picture_prefix ? picture_prefix + picture : picture}
            className="img-fluid rounded-circle avatar"
            alt="Avatar Image"
          />
        ) : (
          <div
            className="avatar-intials"
            style={{
              border: "5px solid " + (color || "#333333"),
              backgroundColor: color || "#333333",
            }}
          >
            <span>
              {firstNameInitial}
              {lastNameInitial}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentAvatar;
