
<nav id="sidebar">
    <a class="sidebar-brand" href="/store"><img id="nav-logo" src="/store/assets/images/acme-logo-white.svg" alt="acme-logo"></a>

    <div class="sidebar-links">
        <a href="/store">Home</a>
        <!-- Change Nav link based on if logged in or not. -->
        <?php
        if(isset( $_SESSION["username"]) ) {
            echo '<a class="btn btn-danger" href="/store/index.php?logout=1">Logout</a>';
        } else { ?>
            <a class="nav-item nav-link" href="/store/register.php">Register</a>
            <a class="nav-item nav-link" href="/store/login.php">Login</a>
            <?php
        }
        ?>
    </div>
</nav>
