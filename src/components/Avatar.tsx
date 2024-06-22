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
  let initials = "?";
  if (name_first || name_last) {
    initials = "";
    if (name_first) {
      initials += name_first[0].toUpperCase();
    }
    if (name_last) {
      initials += name_last[0].toUpperCase();
    }
  }

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
            <span>{initials}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentAvatar;
