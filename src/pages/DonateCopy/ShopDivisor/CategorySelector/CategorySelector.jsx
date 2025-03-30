import "./CategorySelector.css";

const CategorySelector = () => {
  return (
    <>
      <div class="section-with-margin section-with-padding section-four">
        <ul class="tab-list" role="navigation">
          <li
            role="menuitem"
            class="tab-item tab-link"
            data-career=""
            data-current="true"
          >
            All
          </li>
          <li
            role="menuitem"
            class="tab-item tab-link"
            data-career="Customer Support"
          >
            Customer Support
          </li>
          <li role="menuitem" class="tab-item tab-link" data-career="Design">
            Design
          </li>
          <li role="menuitem" class="tab-item tab-link" data-career="Security">
            Security
          </li>
          <li role="menuitem" class="tab-item tab-link" data-career="Tech">
            Tech
          </li>
          <li role="menuitem" class="tab-item tab-link" data-career="Bussines">
            Bussines
          </li>
        </ul>

        <ul class="career-list" id="jobListing"></ul>
      </div>
    </>
  );
};

export default CategorySelector;
