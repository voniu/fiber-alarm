import { getIntl } from "umi";
export default function LocaleText() {
  const intl = getIntl();

  const Pending = intl.formatMessage({ id: "pending" });
  const Processing = intl.formatMessage({ id: "processing" });
  const Solved = intl.formatMessage({ id: "solved" });

  const Password = intl.formatMessage({ id: "Password" });
  const Account = intl.formatMessage({ id: "Account" });
  const Login = intl.formatMessage({ id: "Login" });

  const SuperAdministrationSystem = intl.formatMessage({
    id: "Super Administration System",
  });

  const CurrentAlarm = intl.formatMessage({ id: "Current Alarm" });
  const HistoryAlarm = intl.formatMessage({ id: "History Alarm" });
  const MapSetting = intl.formatMessage({ id: "Map Setting" });
  const DeviceOperation = intl.formatMessage({ id: "Device Operation" });
  const MonitoringMatrix = intl.formatMessage({ id: "Monitoring Matrix" });
  const FiberSensitivity = intl.formatMessage({ id: "Fiber Sensitivity" });
  const LogInformation = intl.formatMessage({ id: "Log Information" });
  const UserManage = intl.formatMessage({ id: "User Manage" });

  const Fiber = intl.formatMessage({ id: "fiber" });
  const Camera = intl.formatMessage({ id: "camera" });
  const Cameras = intl.formatMessage({ id: "Cameras" });

  const Name = intl.formatMessage({ id: "Name" });
  const ZoneNo = intl.formatMessage({ id: "Zone No." });
  const CameraNo = intl.formatMessage({ id: "Camera No." });

  const Intrusion = intl.formatMessage({ id: "intrusion" });
  const Tamper = intl.formatMessage({ id: "tamper" });
  const WireDisconnect = intl.formatMessage({ id: "wire Disconnect" });
  const Disconnect = intl.formatMessage({ id: "Disconnect" });

  const AlarmFiltering = intl.formatMessage({ id: "Alarm Filtering" });
  const AlarmDetail = intl.formatMessage({ id: "Alarm Detail" });
  const Happen = intl.formatMessage({ id: "happen" });
  const Zone = intl.formatMessage({ id: "Zone" });
  const GuarderProcessed = intl.formatMessage({ id: "guarder processed" });
  const OfficerProcessed = intl.formatMessage({ id: "officer processed" });
  const CREATE = intl.formatMessage({ id: "CREATE" });
  const GUARDER = intl.formatMessage({ id: "GUARDER" });
  const OFFICER = intl.formatMessage({ id: "OFFICER" });
  const Guarder = intl.formatMessage({ id: "Guarder" });
  const Officer = intl.formatMessage({ id: "Officer" });
  const Status = intl.formatMessage({ id: "Status" });
  const Time = intl.formatMessage({ id: "Time" });
  const All = intl.formatMessage({ id: "all" });
  const Type = intl.formatMessage({ id: "Type" });
  const Remark = intl.formatMessage({ id: "Remark" });
  const AlarmType = intl.formatMessage({ id: "Alarm Type" });
  const AlarmInfo = intl.formatMessage({ id: "Alarm Info" });
  const AlarmTime = intl.formatMessage({ id: "Alarm Time" });
  const Location = intl.formatMessage({ id: "Location" });
  const CheckMap = intl.formatMessage({ id: "Check Map" });
  const GuardTime = intl.formatMessage({ id: "Guard Time" });

  const Zoom = intl.formatMessage({ id: "Zoom" });
  const Center = intl.formatMessage({ id: "Center" });
  const AutoSelect = intl.formatMessage({ id: "auto select" });
  const reset = intl.formatMessage({ id: "reset" });

  const FiberOpticHost = intl.formatMessage({ id: "Fiber Optic Host" });
  const SuspendDevice = intl.formatMessage({ id: "Suspend Device" });
  const ZoneName = intl.formatMessage({ id: "Zone Name" });
  const SubZoneNo = intl.formatMessage({ id: "Sub-Zone No." });
  const Suspend = intl.formatMessage({ id: "Suspend" });
  const UndoSuspend = intl.formatMessage({ id: "undo Suspend" });
  const AddDevice = intl.formatMessage({ id: "Add Device" });
  const Relation = intl.formatMessage({ id: "Relation" });
  const Dissolve = intl.formatMessage({ id: "Dissolve" });

  const Host = intl.formatMessage({ id: "Host" });
  const Username = intl.formatMessage({ id: "Username" });
  const SnapshotPort = intl.formatMessage({ id: "SnapshotPort" });
  const SnapshotChannel = intl.formatMessage({ id: "SnapshotChannel" });
  const StreamPort = intl.formatMessage({ id: "StreamPort" });
  const StreamChannel = intl.formatMessage({ id: "StreamChannel" });
  const Port = intl.formatMessage({ id: "Port" });

  const EditCamera = intl.formatMessage({ id: "Edit Camera" });
  const EditFiber = intl.formatMessage({ id: "Edit Fiber" });
  const EditFiberOpticHost = intl.formatMessage({
    id: "Edit Fiber Optic Host",
  });
  const AddAssociatedCamera = intl.formatMessage({
    id: "Add Associated Camera",
  });
  const AddCamera = intl.formatMessage({ id: "Add Camera" });
  const AddFiber = intl.formatMessage({ id: "Add Fiber" });
  const AddFiberOpticHost = intl.formatMessage({ id: "Add Fiber Optic Host" });

  const SetUpMonitoringMatrix = intl.formatMessage({
    id: "Set up monitoring matrix",
  });
  const LeftTop = intl.formatMessage({ id: "Left Top" });
  const RightTop = intl.formatMessage({ id: "Right Top" });
  const LeftBottom = intl.formatMessage({ id: "Left Bottom" });
  const RightBottom = intl.formatMessage({ id: "Right Bottom" });
  const Monitor = intl.formatMessage({ id: "Monitor" });
  const PleaseSelect = intl.formatMessage({ id: "Please select" });

  const TaskList = intl.formatMessage({ id: "Task List" });
  const Create = intl.formatMessage({ id: "Create" });
  const Check = intl.formatMessage({ id: "check" });
  const Device = intl.formatMessage({ id: "Device" });
  const Task = intl.formatMessage({ id: "Task" });
  const Config = intl.formatMessage({ id: "config" });
  const VibeCount = intl.formatMessage({ id: "vibeCount" });
  const VibeAmplitude = intl.formatMessage({ id: "vibeAmplitude" });
  const VibeWidth = intl.formatMessage({ id: "vibeWidth" });
  const VibeGap = intl.formatMessage({ id: "vibeGap" });
  const AlarmSensitivity = intl.formatMessage({ id: "alarmSensitivity" });
  const SystemSensitivity = intl.formatMessage({ id: "systemSensitivity" });
  const GroupWidth = intl.formatMessage({ id: "groupWidth" });
  const GroupGap = intl.formatMessage({ id: "groupGap" });
  const GroupEntity = intl.formatMessage({ id: "groupEntity" });
  const Optional = intl.formatMessage({ id: "Optional" });

  const SuspendedUser = intl.formatMessage({ id: "Suspended user" });
  const Add = intl.formatMessage({ id: "Add" });
  const AddOfficer = intl.formatMessage({ id: "Add Officer" });
  const AddGuarder = intl.formatMessage({ id: "Add Guarder" });
  const User = intl.formatMessage({ id: "User" });
  const NickName = intl.formatMessage({ id: "NickName" });
  const Identity = intl.formatMessage({ id: "Identity" });
  const CreateTime = intl.formatMessage({ id: "CreateTime" });
  const ResetPassword = intl.formatMessage({ id: "Reset Password" });
  const Admin = intl.formatMessage({ id: "admin" });

  const None = intl.formatMessage({ id: "none" });
  const Success = intl.formatMessage({ id: "success" });
  const Delete = intl.formatMessage({ id: "Delete" });
  const Operator = intl.formatMessage({ id: "Operator" });
  const Detail = intl.formatMessage({ id: "Detail" });
  const DealWith = intl.formatMessage({ id: "deal with" });
  const Edit = intl.formatMessage({ id: "Edit" });
  const Test = intl.formatMessage({ id: "Test" });
  const Search = intl.formatMessage({ id: "Search" });
  const Submit = intl.formatMessage({ id: "submit" });

  const ChangePassword = intl.formatMessage({ id: "Change Password" });
  const CurrentPassword = intl.formatMessage({ id: "Current Password" });
  const NewPassword = intl.formatMessage({ id: "New Password" });
  const ConfirmPassword = intl.formatMessage({ id: "Confirm Password" });

  const Yes = intl.formatMessage({ id: "Yes" });
  const No = intl.formatMessage({ id: "No" });
  const SureToConfirm = intl.formatMessage({ id: "Sure to Confirm" });
  const DeleteTheAlarm = intl.formatMessage({ id: "delete the alarm" });
  const AreYouSureToDelete = intl.formatMessage({
    id: "Are you sure to delete",
  });
  const AreYouSureToSuspend = intl.formatMessage({
    id: "Are you sure to suspend",
  });
  const AreYouSureToUndoSuspend = intl.formatMessage({
    id: "Are you sure to Undo suspend",
  });
  const PleaseDescribeBrieflyAndDealWithItImmediately = intl.formatMessage({
    id: "Please describe briefly and deal with it immediately",
  });
  const PleaseInput = intl.formatMessage({ id: "Please Input" });
  const InputProcessInfo = intl.formatMessage({ id: "input processInfo" });
  const PleaseInputNumber = intl.formatMessage({
    id: "Please input numbers only",
  });
  const TwoInputsAreInConsistent = intl.formatMessage({
    id: "Two inputs are inconsistent",
  });
  const PasswordRules = intl.formatMessage({
    id: "6-10 digit password. Must including Letters, numbers, special symbols",
  });
  const SelectTooltip = intl.formatMessage({
    id: "Select one guarder below and start duty",
  });

  return {
    Login,
    Account,
    Pending,
    Processing,
    Solved,
    Intrusion,
    Tamper,
    WireDisconnect,
    Disconnect,
    Happen,
    Zone,
    GuarderProcessed,
    OfficerProcessed,
    CREATE,
    GUARDER,
    OFFICER,
    Guarder,
    Officer,
    Status,
    Time,
    All,
    Type,
    Remark,
    AlarmType,
    Success,
    Delete,
    Detail,
    SuperAdministrationSystem,
    AlarmFiltering,
    Search,
    DealWith,
    CurrentAlarm,
    HistoryAlarm,
    MapSetting,
    DeviceOperation,
    MonitoringMatrix,
    FiberSensitivity,
    LogInformation,
    UserManage,
    AlarmDetail,
    Fiber,
    Camera,
    Name,
    AlarmInfo,
    AlarmTime,
    Location,
    ZoneNo,
    CameraNo,
    CheckMap,
    GuardTime,
    Submit,
    Zoom,
    Center,
    AutoSelect,
    reset,
    FiberOpticHost,
    SuspendDevice,
    ZoneName,
    SubZoneNo,
    Suspend,
    UndoSuspend,
    AddDevice,
    Relation,
    Dissolve,
    EditCamera,
    EditFiber,
    EditFiberOpticHost,
    AddAssociatedCamera,
    AddCamera,
    AddFiber,
    AddFiberOpticHost,
    Edit,
    Test,
    Host,
    Username,
    SnapshotPort,
    SnapshotChannel,
    StreamPort,
    StreamChannel,
    Port,
    Operator,
    Cameras,
    Password,
    None,
    SetUpMonitoringMatrix,
    LeftTop,
    RightTop,
    LeftBottom,
    RightBottom,
    Monitor,
    PleaseSelect,
    TaskList,
    Create,
    Check,
    Device,
    Task,
    Config,
    VibeCount,
    VibeAmplitude,
    VibeWidth,
    VibeGap,
    AlarmSensitivity,
    SystemSensitivity,
    GroupWidth,
    GroupGap,
    GroupEntity,
    Optional,
    SuspendedUser,
    Add,
    AddOfficer,
    AddGuarder,
    User,
    NickName,
    Identity,
    CreateTime,
    ResetPassword,
    Admin,
    Yes,
    No,
    SureToConfirm,
    DeleteTheAlarm,
    AreYouSureToDelete,
    AreYouSureToUndoSuspend,
    AreYouSureToSuspend,
    PleaseInput,
    PleaseDescribeBrieflyAndDealWithItImmediately,
    InputProcessInfo,
    PleaseInputNumber,
    TwoInputsAreInConsistent,
    ChangePassword,
    CurrentPassword,
    NewPassword,
    ConfirmPassword,
    PasswordRules,
    SelectTooltip,
  };
}
